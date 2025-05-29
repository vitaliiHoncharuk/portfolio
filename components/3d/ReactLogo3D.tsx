"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Preload } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function ReactAtom() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
    
    ringRefs.current.forEach((ring, index) => {
      if (ring) {
        ring.rotation.x = clock.getElapsedTime() * (0.5 + index * 0.1);
        ring.rotation.y = clock.getElapsedTime() * (0.3 + index * 0.1);
      }
    });
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <group ref={groupRef}>
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color="#64ffda"
            emissive="#64ffda"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {[0, 60, 120].map((rotation, index) => (
          <mesh
            key={index}
            ref={(el) => {
              if (el) ringRefs.current[index] = el;
            }}
            rotation={[0, 0, (rotation * Math.PI) / 180]}
          >
            <torusGeometry args={[2.5, 0.08, 8, 100]} />
            <meshStandardMaterial
              color="#64ffda"
              emissive="#64ffda"
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.8}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        color="#64ffda"
        size={0.05}
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function ReactLogo3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <ReactAtom />
          <Particles />
          
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}