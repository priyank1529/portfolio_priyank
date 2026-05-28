import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useThemeReactive } from '../lib/theme.js';

const COUNT = 3200;
const FIELD_R = 7;
const REPEL_R = 1.9;
const REPEL_R2 = REPEL_R * REPEL_R;

/* Per-theme palette. Light mode uses NORMAL blending + opaque dark dots
   (additive blending hides dark colors on light bg). */
const PALETTE = {
  dark: {
    bg: '#0E0D0B',
    fog: '#0E0D0B',
    light1: '#FF8B5C',
    light2: '#EAB683',
    sparkle: '#FFD9B8',
    comet: '#FFD9B8',
    cometLight: '#FF8B5C',
    bloom: 0.85,
    blending: THREE.AdditiveBlending,
    stops: [
      [0.949, 0.929, 0.890],
      [1.000, 0.851, 0.722],
      [1.000, 0.545, 0.361],
      [0.918, 0.714, 0.514],
    ],
    opacity: 0.92,
    dotSize: 0.026,
    ambient: 0.30,
  },
  light: {
    bg: '#F5EFE3',
    fog: '#F5EFE3',
    light1: '#C25539',
    light2: '#A87D46',
    sparkle: '#9E4026',
    comet: '#1A1814',
    cometLight: '#C25539',
    bloom: 0.18,
    blending: THREE.NormalBlending,
    stops: [
      [0.102, 0.094, 0.078],   // near-black ink
      [0.620, 0.235, 0.150],   // deep rust
      [0.760, 0.333, 0.224],   // rust
      [0.450, 0.330, 0.180],   // dark sienna
    ],
    opacity: 0.95,
    dotSize: 0.028,
    ambient: 0.55,
  },
};

function pickColor(t, stops) {
  const seg = Math.min(stops.length - 2, Math.floor(t * (stops.length - 1)));
  const u = t * (stops.length - 1) - seg;
  const a = stops[seg], b = stops[seg + 1];
  return [
    a[0] + (b[0] - a[0]) * u,
    a[1] + (b[1] - a[1]) * u,
    a[2] + (b[2] - a[2]) * u,
  ];
}

function DotField({ palette }) {
  const ref = useRef();
  const { viewport, mouse } = useThree();

  const { positions, basePositions, velocities, baseRadius } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const base = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    const baseR = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const r = Math.pow(Math.random(), 0.5) * FIELD_R;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r * 0.62;
      const z = (Math.random() - 0.5) * 2.4;
      positions[i*3]   = base[i*3]   = x;
      positions[i*3+1] = base[i*3+1] = y;
      positions[i*3+2] = base[i*3+2] = z;
      baseR[i] = Math.min(1, r / FIELD_R);
    }
    return { positions, basePositions: base, velocities: vel, baseRadius: baseR };
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const c = pickColor(baseRadius[i], palette.stops);
      col[i*3] = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2];
    }
    return col;
  }, [palette, baseRadius]);

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

      const dx = x - mx, dy = y - my;
      const d2 = dx*dx + dy*dy;
      if (d2 < REPEL_R2 && d2 > 0.0001) {
        const d = Math.sqrt(d2);
        const f = (1 - d2 / REPEL_R2) * 0.05;
        velocities[i3]   += (dx / d) * f;
        velocities[i3+1] += (dy / d) * f;
        velocities[i3+2] += (Math.random() - 0.5) * 0.006;
      }

      velocities[i3]   += (bx - x) * 0.013;
      velocities[i3+1] += (by - y) * 0.013;
      velocities[i3+2] += (bz - z) * 0.018;

      velocities[i3]   *= 0.92;
      velocities[i3+1] *= 0.92;
      velocities[i3+2] *= 0.92;

      const swirl = Math.sin(t * 0.22 + i * 0.013) * 0.0005;

      arr[i3]   = x + velocities[i3]   + swirl;
      arr[i3+1] = y + velocities[i3+1];
      arr[i3+2] = z + velocities[i3+2];
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.z = Math.sin(t * 0.05) * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={COUNT} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={palette.dotSize}
        vertexColors
        transparent
        opacity={palette.opacity}
        sizeAttenuation
        depthWrite={false}
        blending={palette.blending}
      />
    </points>
  );
}

function CursorComet({ palette }) {
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
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color={palette.comet} toneMapped={false} />
      </mesh>
      <pointLight color={palette.cometLight} intensity={2.4} distance={2.4} />
    </group>
  );
}

function CameraParallax() {
  const { camera } = useThree();
  useFrame((s) => {
    const mx = s.mouse.x, my = s.mouse.y;
    camera.position.x += (mx * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (-my * 0.35 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene3D() {
  const theme = useThemeReactive();
  const palette = PALETTE[theme];

  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        dpr={[1, 1.7]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[palette.bg]} />
        <fog attach="fog" args={[palette.fog, 9, 22]} />

        <ambientLight intensity={palette.ambient} />
        <pointLight position={[6, 6, 6]} intensity={0.9} color={palette.light1} />
        <pointLight position={[-6, -4, 4]} intensity={0.7} color={palette.light2} />

        <Suspense fallback={null}>
          <CameraParallax />
          <DotField palette={palette} />
          <CursorComet palette={palette} />
          <Sparkles count={70} scale={[14, 8, 8]} size={1.4} speed={0.25} color={palette.sparkle} />
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom intensity={palette.bloom} luminanceThreshold={0.18} luminanceSmoothing={0.22} mipmapBlur />
          <Noise opacity={0.025} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
