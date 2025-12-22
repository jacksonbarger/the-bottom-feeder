"use client";

import { Suspense, useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

interface Product3DViewerGLProps {
  className?: string;
  modelPath?: string;
}

// Configure GLTF loader with Draco decoder
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

// Custom hook to load GLB with Draco support
function useGLTFWithDraco(path: string) {
  const [gltf, setGltf] = useState<THREE.Group | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      path,
      (result) => {
        // Apply a nice material to all meshes since OBJ had no materials
        result.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Create a nice blue/teal plastic-like material matching the brand
            child.material = new THREE.MeshStandardMaterial({
              color: new THREE.Color("#0077B6"), // Brand blue
              metalness: 0.3,
              roughness: 0.4,
              envMapIntensity: 1.0,
            });
          }
        });
        setGltf(result.scene);
        setProgress(100);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          setProgress((xhr.loaded / xhr.total) * 100);
        }
      },
      (err) => {
        console.error("Error loading GLB:", err);
        setError(err as Error);
      }
    );

    return () => {
      // Don't dispose the shared dracoLoader
    };
  }, [path]);

  return { scene: gltf, error, progress };
}

// 3D Model component - static, centered, draggable
function Model({
  modelPath,
  rotationX,
  rotationY,
}: {
  modelPath: string;
  rotationX: number;
  rotationY: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, error } = useGLTFWithDraco(modelPath);
  const { camera } = useThree();

  // Center and scale the model once loaded
  useEffect(() => {
    if (scene && groupRef.current) {
      // Calculate bounding box
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Move scene so its center is at origin
      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;

      // Calculate scale to fit nicely in view
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.5 / maxDim;
      groupRef.current.scale.set(scale, scale, scale);
    }
  }, [scene, camera]);

  if (error || !scene) {
    return null;
  }

  return (
    <group ref={groupRef} rotation={[rotationX, rotationY, 0]} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// Loading indicator
function LoadingIndicator({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#0077B6] border-t-transparent rounded-full animate-spin" />
        <div className="text-center">
          <span className="text-gray-400 text-sm block">Loading 3D Model...</span>
          <span className="text-[#00B4D8] text-xs">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function Product3DViewerGL({
  className = "",
  modelPath = "/models/bottom-feeder.glb",
}: Product3DViewerGLProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastXRef = useRef(0);
  const lastYRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if model exists
  useEffect(() => {
    fetch(modelPath, { method: "HEAD" })
      .then((response) => {
        if (!response.ok) {
          setHasError(true);
        }
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [modelPath]);

  // Handle drag to rotate (both X and Y axes)
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastXRef.current;
    const deltaY = e.clientY - lastYRef.current;
    const sensitivity = 0.01; // radians per pixel

    setRotationY((prev) => prev + deltaX * sensitivity);
    setRotationX((prev) => prev + deltaY * sensitivity);
    lastXRef.current = e.clientX;
    lastYRef.current = e.clientY;
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  if (hasError) {
    return (
      <div
        className={`relative aspect-square bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] rounded-2xl overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-gray-400 text-sm">3D Model not available</p>
            <p className="text-gray-500 text-xs mt-2">
              Upload a GLB file to /models/bottom-feeder.glb
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: "none" }}
    >
      {isLoading && <LoadingIndicator progress={0} />}

      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 3, -5]} intensity={0.8} />
        <directionalLight position={[0, -5, 0]} intensity={0.3} />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Model - centered, static until dragged */}
        <Suspense fallback={null}>
          <Model
            modelPath={modelPath}
            rotationX={rotationX}
            rotationY={rotationY}
          />
        </Suspense>
      </Canvas>

      {/* Instruction overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full flex items-center gap-2">
          <svg
            className="w-4 h-4 text-[#00B4D8]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="text-white/90 text-xs sm:text-sm">Drag to rotate</span>
        </div>
      </div>
    </div>
  );
}
