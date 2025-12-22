"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Use frame-based animation instead of 3D model (model file too large for deployment)
const FRAME_IMAGES = [
  "/images/3d-viewer/frame-01.png",
  "/images/3d-viewer/frame-02.png",
  "/images/3d-viewer/frame-03.png",
  "/images/3d-viewer/frame-04.png",
  "/images/3d-viewer/frame-05.png",
  "/images/3d-viewer/frame-06.png",
  "/images/3d-viewer/frame-07.png",
  "/images/3d-viewer/frame-08.png",
];

interface Product3DViewerProps {
  className?: string;
}

export default function Product3DViewer({ className = "" }: Product3DViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastXRef = useRef(0);

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = FRAME_IMAGES.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if image fails
          img.src = src;
        });
      });
      await Promise.all(promises);
      setImagesLoaded(true);
    };
    preloadImages();
  }, []);

  // Mouse/Touch handlers for drag rotation
  const handleStart = useCallback((clientX: number) => {
    setIsDragging(true);
    lastXRef.current = clientX;
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;

    const deltaX = clientX - lastXRef.current;
    const sensitivity = 5; // pixels per frame

    if (Math.abs(deltaX) > sensitivity) {
      const direction = deltaX > 0 ? 1 : -1;
      setCurrentFrame((prev) => (prev + direction + FRAME_IMAGES.length) % FRAME_IMAGES.length);
      lastXRef.current = clientX;
    }
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  // Global event listeners
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", handleEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  if (!imagesLoaded) {
    return (
      <div className={`relative aspect-square bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] rounded-2xl overflow-hidden ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#0077B6] border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Loading 3D View...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ touchAction: "none" }}
    >
      {/* Frame images */}
      <div className="absolute inset-4 sm:inset-8">
        {FRAME_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Product view ${index + 1}`}
            fill
            className={`object-contain transition-opacity duration-100 ${
              index === currentFrame ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 80vw, 40vw"
            priority={index < 2}
            draggable={false}
          />
        ))}
      </div>

      {/* Frame indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
        {FRAME_IMAGES.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentFrame ? "bg-[#00B4D8]" : "bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Instruction overlay - only show initially */}
      {!isDragging && currentFrame === 0 && (
        <motion.div
          className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-black/60 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full flex items-center gap-2">
            <svg className="w-4 h-4 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-white/90 text-xs sm:text-sm">Drag to rotate</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
