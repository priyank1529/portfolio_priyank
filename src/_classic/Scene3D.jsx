import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { bubbles } from '../lib/portfolioData';

const COUNT = 2800;
const FIELD_R = 6.5;
const REPEL_R = 1.7;
const REPEL_R2 = REPEL_R * REPEL_R;

/* Reactive dot field — cursor repels nearby dots; spring pulls them back. */
function ReactiveField() {
  const ref = useRef();
  const { viewport, mouse } = useThree();

  const { positions, basePositions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const base = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      // disk-ish distribution, denser toward center
      const r = Math.pow(Math.random(), 0.55) * FIELD_R;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r * 0.62;
      const z = (Math.random() - 0.5) * 2.2;
      positions[i*3] = base[i*3] = x;
      positions[i*3+1] = base[i*3+1] = y;
      positions[i*3+2] = base[i*3+2] = z;

      // gradient: center cyan → mid violet → edge fuchsia
      const t = Math.min(1, r / FIELD_R);
      let R, G, B;
      if (t < 0.5) {
        const u = t / 0.5;
        R = 0.13 + (0.55 - 0.13) * u;
        G = 0.83 + (0.36 - 0.83) * u;
        B = 0.93 + (0.96 - 0.93) * u;
      } else {
        const u = (t - 0.5) / 0.5;
        R = 0.55 + (0.85 - 0.55) * u;
        G = 0.36 + (0.27 - 0.36) * u;
        B = 0.96 + (0.94 - 0.96) * u;
      }
      col[i*3] = R; col[i*3+1] = G; col[i*3+2] = B;
    }
    return { positions, basePositions: base, velocities: vel, colors: col };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    const mx = mouse.x * viewport.width / 2;
    const my = mouse.y * viewport.height / 2;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const x = arr[i3], y = arr[i3+1], z = arr[i3+2];
      const bx = basePositions[i3], by = basePositions[i3+1], bz = basePositions[i3+2];

      // cursor repel
      const dx = x - mx, dy = y - my;
      const d2 = dx*dx + dy*dy;
      if (d2 < REPEL_R2 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const f = (1 - d2 / REPEL_R2) * 0.045;
        velocities[i3]   += (dx / d) * f;
        velocities[i3+1] += (dy / d) * f;
        velocities[i3+2] += (Math.random() - 0.5) * 0.005;
      }

      // spring back to base
      velocities[i3]   += (bx - x) * 0.014;
      velocities[i3+1] += (by - y) * 0.014;
      velocities[i3+2] += (bz - z) * 0.018;

      // damping
      velocities[i3]   *= 0.92;
      velocities[i3+1] *= 0.92;
      velocities[i3+2] *= 0.92;

      // ambient drift
      const swirl = Math.sin(t * 0.25 + i * 0.013) * 0.0006;

      arr[i3]   = x + velocities[i3]   + swirl;
      arr[i3+1] = y + velocities[i3+1];
      arr[i3+2] = z + velocities[i3+2];
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.z = Math.sin(t * 0.06) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={COUNT} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.95}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* Cursor comet — small bright dot tracks cursor with easing. */
function CursorComet() {
  const ref = useRef();
  const { viewport, mouse } = useThree();
  useFrame(() => {
    if (!ref.current) return;
    const tx = mouse.x * viewport.width / 2;
    const ty = mouse.y * viewport.height / 2;
    ref.current.position.x += (tx - ref.current.position.x) * 0.16;
    ref.current.position.y += (ty - ref.current.position.y) * 0.16;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#a5f3fc" toneMapped={false} />
      </mesh>
      <pointLight color="#22d3ee" intensity={3.2} distance={2.4} />
    </group>
  );
}

/* Small glowing nav dot — clickable, label fades in on hover. */
function NavDot({ data }) {
  const [hover, setHover] = useState(false);
  const meshRef = useRef();
  const lightRef = useRef();

  useFrame((s) => {
    if (!meshRef.current) return;
    const t = s.clock.elapsedTime;
    const target = hover ? 2.4 : 1;
    meshRef.current.scale.x += (target - meshRef.current.scale.x) * 0.15;
    meshRef.current.scale.y = meshRef.current.scale.z = meshRef.current.scale.x;
    const pulse = 1 + Math.sin(t * 2 + data.position[0]) * 0.18;
    if (lightRef.current) lightRef.current.intensity = (hover ? 4 : 1.5) * pulse;
  });

  const onClick = () => {
    document.getElementById(data.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.8} position={data.position}>
      <group
        onClick={onClick}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto'; }}
      >
        {/* halo ring */}
        <mesh>
          <ringGeometry args={[0.16, 0.22, 32]} />
          <meshBasicMaterial color={data.color} transparent opacity={hover ? 0.75 : 0.25} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        {/* core */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.075, 24, 24]} />
          <meshBasicMaterial color={data.color} toneMapped={false} />
        </mesh>
        <pointLight ref={lightRef} color={data.color} intensity={1.5} distance={2.4} />
        <Html distanceFactor={10} position={[0, 0.38, 0]} center style={{ pointerEvents: 'none' }}>
          <div
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.22em] whitespace-nowrap border backdrop-blur-md transition-all duration-300 ${
              hover
                ? 'opacity-100 border-white/40 bg-black/60 text-white translate-y-0'
                : 'opacity-60 border-white/10 bg-black/30 text-white/70 translate-y-1'
            }`}
          >
            {data.label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function CameraParallax() {
  useFrame((s) => {
    const { mouse, camera } = s;
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.035;
    camera.position.y += (-mouse.y * 0.35 - camera.position.y) * 0.035;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0, 7], fov: 52 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#04050a']} />
        <fog attach="fog" args={['#04050a', 9, 20]} />

        <ambientLight intensity={0.35} />
        <pointLight position={[6, 6, 6]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[-6, -4, 4]} intensity={0.8} color="#22d3ee" />

        <Suspense fallback={null}>
          <CameraParallax />
          <ReactiveField />
          <CursorComet />
          {bubbles.map((b) => <NavDot key={b.id} data={b} />)}
          <Sparkles count={80} scale={[14, 7, 8]} size={1.6} speed={0.3} color="#22d3ee" />
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom intensity={1.05} luminanceThreshold={0.15} luminanceSmoothing={0.2} mipmapBlur />
          <Noise opacity={0.035} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
