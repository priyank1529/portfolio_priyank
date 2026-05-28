// Backup of original bubble-based Scene3D.
// Revert: in Hero.jsx change `./Scene3D.jsx` to `./Scene3DBubbles.jsx`.
import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Environment, Html } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { bubbles } from '../lib/portfolioData';

function Bubble({ data }) {
  const ref = useRef();
  const glow = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.35) * 0.15;
  });

  const handleSelect = () => {
    const el = document.getElementById(data.id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.6} position={data.position}>
      <group
        onClick={handleSelect}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; if (glow.current) glow.current.intensity = 3.0; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; if (glow.current) glow.current.intensity = 1.6; }}
      >
        <mesh ref={ref}>
          <icosahedronGeometry args={[data.featured ? 0.95 : 0.7, 32]} />
          <MeshDistortMaterial
            color={data.color}
            speed={2.2}
            distort={0.35}
            roughness={0.05}
            metalness={0.55}
            emissive={data.color}
            emissiveIntensity={0.85}
            transparent
            opacity={0.92}
          />
        </mesh>
        <pointLight ref={glow} color={data.color} intensity={1.6} distance={4} />
        <Html distanceFactor={9} position={[0, data.featured ? -1.25 : -1.0, 0]} center>
          <div className="pointer-events-none select-none px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.18em]
            text-white/85 bg-black/40 border border-white/10 backdrop-blur-md">
            {data.label}
          </div>
        </Html>
      </group>
    </Float>
  );
}

function Particles({ count = 1400 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      arr[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i*3+2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const ref = useRef();
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.02; });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#9ad8ff" transparent opacity={0.65} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function CameraParallax() {
  useFrame((s) => {
    const { mouse, camera } = s;
    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3DBubbles() {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas dpr={[1, 1.7]} camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#04050a']} />
        <fog attach="fog" args={['#04050a', 8, 18]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={1.2} color="#8b5cf6" />
        <pointLight position={[-6, -4, 4]} intensity={1.1} color="#22d3ee" />
        <pointLight position={[0, 4, -4]} intensity={0.6} color="#d946ef" />
        <Suspense fallback={null}>
          <Environment preset="night" />
          <CameraParallax />
          {bubbles.map((b) => <Bubble key={b.id} data={b} />)}
          <Particles />
          <Sparkles count={120} scale={[12, 6, 8]} size={2} speed={0.4} color="#22d3ee" />
        </Suspense>
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.95} luminanceThreshold={0.18} luminanceSmoothing={0.18} mipmapBlur />
          <Noise opacity={0.04} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
