"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Preload } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";

const skills = [
  { name: "React", size: 1.2, color: "#61DAFB" },
  { name: "TypeScript", size: 1.1, color: "#3178C6" },
  { name: "JavaScript", size: 1.0, color: "#F7DF1E" },
  { name: "Next.js", size: 0.9, color: "#000000" },
  { name: "GraphQL", size: 0.8, color: "#E10098" },
  { name: "Redux", size: 0.8, color: "#764ABC" },
  { name: "Node.js", size: 0.8, color: "#339933" },
  { name: "Tailwind", size: 0.7, color: "#06B6D4" },
  { name: "Jest", size: 0.7, color: "#C21325" },
  { name: "Git", size: 0.7, color: "#F05032" },
  { name: "Docker", size: 0.6, color: "#2496ED" },
  { name: "MongoDB", size: 0.6, color: "#47A248" },
];

function Skill({ skill, position }: { skill: typeof skills[0]; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      const scale = hovered ? skill.size * 1.2 : skill.size;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={hovered ? 0.5 : 0.2}
        roughness={0.3}
        metalness={0.8}
      />
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </mesh>
  );
}

function SkillsCloud() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  const positions: [number, number, number][] = skills.map((_, i) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / skills.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const radius = 3;
    
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    ];
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => (
        <Skill key={skill.name} skill={skill} position={positions[index]} />
      ))}
    </group>
  );
}

export default function SkillsSphere() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <SkillsCloud />
          
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={15}
            autoRotate
            autoRotateSpeed={0.5}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}