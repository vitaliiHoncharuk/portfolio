"use client";
// @ts-nocheck

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Core skills that will be displayed in the 3D sphere
const skills = [
  { name: "React", color: "#61DAFB", size: 1.2, distance: 3 },
  { name: "TypeScript", color: "#3178C6", size: 1.1, distance: 2.9 },
  { name: "JavaScript", color: "#F7DF1E", size: 1.1, distance: 2.8 },
  { name: "Next.js", color: "#ffffff", size: 1.0, distance: 2.7 },
  { name: "Redux", color: "#764ABC", size: 0.9, distance: 2.6 },
  { name: "GraphQL", color: "#E535AB", size: 0.9, distance: 2.5 },
  { name: "HTML", color: "#E34F26", size: 0.8, distance: 2.4 },
  { name: "CSS", color: "#1572B6", size: 0.8, distance: 2.3 },
  { name: "Node.js", color: "#339933", size: 0.8, distance: 2.2 },
  { name: "Git", color: "#F05032", size: 0.7, distance: 2.1 },
  { name: "Webpack", color: "#8DD6F9", size: 0.7, distance: 2.0 },
  { name: "Jest", color: "#C21325", size: 0.7, distance: 1.9 },
];

function SkillsGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Center sphere representing core skills */}
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial 
          color="#64ffda"
          emissive="#64ffda"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </Sphere>
      
      {/* Skills distributed around the sphere */}
      {skills.map((skill, index) => {
        // Calculate position on a sphere
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const x = skill.distance * Math.cos(theta) * Math.sin(phi);
        const y = skill.distance * Math.sin(theta) * Math.sin(phi);
        const z = skill.distance * Math.cos(phi);
        
        return (
          <group key={index} position={[x, y, z]}>
            <Sphere args={[skill.size * 0.15, 16, 16]}>
              <meshStandardMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.5} />
            </Sphere>
            <Text
              position={[0, skill.size * 0.25, 0]}
              fontSize={skill.size * 0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {skill.name}
            </Text>
            {/* Connection line to center */}
            <line>
              <bufferGeometry
                attach="geometry"
                onUpdate={(self: THREE.BufferGeometry) => {
                  const positions = new Float32Array([0, 0, 0, 0, 0, 0]);
                  self.setAttribute(
                    "position",
                    new THREE.BufferAttribute(positions, 3)
                  );
                }}
              />
              <lineBasicMaterial
                attach="material"
                color={skill.color}
                opacity={0.3}
                transparent
                linewidth={1}
              />
            </line>
          </group>
        );
      })}
    </group>
  );
}

export default function SkillsCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SkillsGlobe />
      </Canvas>
    </div>
  );
}