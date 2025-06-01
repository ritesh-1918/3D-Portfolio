import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useGesture } from '@use-gesture/react';

const ParticleSystem = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const { viewport, mouse } = useThree();
  
  const count = 5000;
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color1 = new THREE.Color('#00FF88');
    const color2 = new THREE.Color('#7000FF');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const particles = particlesRef.current;
    const positions = particles.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Rotate particles
      const x = positions[i3];
      const z = positions[i3 + 2];
      positions[i3] = x * Math.cos(0.0005) - z * Math.sin(0.0005);
      positions[i3 + 2] = z * Math.cos(0.0005) + x * Math.sin(0.0005);
      
      // Mouse repulsion
      const dx = x - (mouse.x * viewport.width) / 2;
      const dy = positions[i3 + 1] - (mouse.y * viewport.height) / 2;
      const dz = z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const force = Math.max(0, 1 - distance / 2);
      
      positions[i3] += (dx / distance) * force * 0.01;
      positions[i3 + 1] += (dy / distance) * force * 0.01;
      positions[i3 + 2] += (dz / distance) * force * 0.01;
    }

    particles.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        blending={THREE.AdditiveBlending}
        transparent
        depthWrite={false}
      />
    </points>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#1a1a1a']} />
        <fog attach="fog" args={['#1a1a1a', 5, 15]} />
        <ParticleSystem />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;