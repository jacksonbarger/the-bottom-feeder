"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
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
      dracoLoader.dispose();
    };
  }, [path]);

  return { scene: gltf, error, progress };
}

// 3D Model component with auto-rotation
function Model({ modelPath }: { modelPath: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, error, progress } = useGLTFWithDraco(modelPath);
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotate when not being interacted with
  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  if (error) {
    return null;
  }

  if (!scene) {
    return null;
  }

  // Center and scale the model
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = 2 / maxDim;

  const center = box.getCenter(new THREE.Vector3());
  scene.position.sub(center);

  return (
    <group
      ref={groupRef}
      scale={[scale, scale, scale]}
      onPointerDown={() => setAutoRotate(false)}
      onPointerUp={() => setAutoRotate(true)}
      onPointerLeave={() => setAutoRotate(true)}
    >
      <primitive object={scene} />
    </group>
  );
}

// Loading indicator
function LoadingIndicator({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
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
  const [progress, setProgress] = useState(0);

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
      className={`relative aspect-square bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
    >
      {isLoading && <LoadingIndicator progress={progress} />}

      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />

        {/* Environment for reflections */}
        <Environment preset="studio" />

        {/* Model */}
        <Suspense fallback={null}>
          <Model modelPath={modelPath} />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          rotateSpeed={0.5}
        />
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
