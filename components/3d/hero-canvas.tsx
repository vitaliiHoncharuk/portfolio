"use client";
// @ts-nocheck

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ReactLogoProps {
  position?: [number, number, number];
  scale?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function ReactLogo({ position = [0, 0, 0], scale = 1, mouse }: ReactLogoProps) {
  const group = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
      
      // Subtle tilt based on mouse position
      if (mouse.current) {
        group.current.rotation.x = THREE.MathUtils.lerp(
          group.current.rotation.x,
          (mouse.current.y * Math.PI) / 20,
          0.1
        );
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y,
          (mouse.current.x * Math.PI) / 20,
          0.1
        );
      }
    }
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Outer elliptical orbit */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.5} />
      </mesh>

      {/* Inner elliptical orbit */}
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.5} />
      </mesh>

      {/* Center sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.5} />
      </mesh>

      {/* Electrons */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[1.3, -0.8, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.8} />
        </mesh>
      </Float>

      <Float speed={3.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-1.3, -0.8, 0]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

interface ParticlesProps {
  count?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function Particles({ count = 100, mouse }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const positions = useRef(new Float32Array(count * 3));
  
  useEffect(() => {
    for (let i = 0; i < count * 3; i += 3) {
      positions.current[i] = (Math.random() - 0.5) * 10;
      positions.current[i + 1] = (Math.random() - 0.5) * 10;
      positions.current[i + 2] = (Math.random() - 0.5) * 10;
    }
  }, [count]);
  
  useFrame(() => {
    if (mesh.current && mouse.current) {
      mesh.current.rotation.x = mouse.current.y * 0.01;
      mesh.current.rotation.y = mouse.current.x * 0.01;
    }
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={count} 
          array={positions.current} 
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#64ffda" 
        transparent 
        opacity={0.3} 
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas() {
  const mouse = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ReactLogo position={[0, 0, 0]} scale={1.2} mouse={mouse} />
        <Particles count={200} mouse={mouse} />
      </Canvas>
    </div>
  );
}