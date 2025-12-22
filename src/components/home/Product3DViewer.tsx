"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import * as THREE from "three";

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const obj = useLoader(OBJLoader, url);
  const meshRef = useRef<THREE.Group>(null);

  // Apply a nice material to all meshes
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: "#1a1a2e",
        metalness: 0.8,
        roughness: 0.2,
      });
    }
  });

  return (
    <Center>
      <primitive
        ref={meshRef}
        object={obj}
        scale={2}
      />
    </Center>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#0077B6] border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-400 text-sm">Loading 3D Model...</span>
      </div>
    </div>
  );
}

interface Product3DViewerProps {
  className?: string;
}

export default function Product3DViewer({ className = "" }: Product3DViewerProps) {
  return (
    <div className={`relative aspect-square bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] rounded-2xl overflow-hidden ${className}`}>
      <Suspense fallback={<LoadingSpinner />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* The 3D Model */}
          <Model url="/models/bottom-feeder.obj" />

          {/* Orbit Controls - allows drag to rotate */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={2}
            maxDistance={10}
            autoRotate={false}
            rotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>

      {/* Instruction overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
          <svg className="w-4 h-4 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="text-white/90 text-sm">Drag to rotate</span>
        </div>
      </div>
    </div>
  );
}
