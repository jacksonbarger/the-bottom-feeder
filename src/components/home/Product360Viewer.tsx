"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Product360ViewerProps {
  images: string[];
  className?: string;
}

export default function Product360Viewer({
  images,
  className = "",
}: Product360ViewerProps) {
  const [wheelAngle, setWheelAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch {
        // Images failed to preload - continue with loading state
        // The component will still work, just with potential loading flicker
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, [images]);

  // Calculate which frame to show based on wheel angle
  const frameCount = images.length;
  const degreesPerFrame = 360 / frameCount;
  const normalizedAngle = ((wheelAngle % 360) + 360) % 360;
  const currentFrame = Math.floor(normalizedAngle / degreesPerFrame) % frameCount;

  // Calculate angle from center based on mouse/touch position
  const calculateAngle = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 0;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Calculate angle in degrees (0° at top, clockwise)
    let angle = Math.atan2(deltaX, -deltaY) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    return angle;
  }, []);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const angle = calculateAngle(e.clientX, e.clientY);
    setWheelAngle(angle);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const angle = calculateAngle(e.clientX, e.clientY);
    setWheelAngle(angle);
  }, [isDragging, calculateAngle]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    const angle = calculateAngle(touch.clientX, touch.clientY);
    setWheelAngle(angle);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const angle = calculateAngle(touch.clientX, touch.clientY);
    setWheelAngle(angle);
  }, [isDragging, calculateAngle]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Global mouse/touch listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  if (!imagesLoaded) {
    return (
      <div className={`relative aspect-square ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#0077B6] border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-400 text-sm">Loading 3D View...</span>
          </div>
        </div>
      </div>
    );
  }

  // SVG arc path calculation
  const createArcPath = (startAngle: number, endAngle: number, radius: number) => {
    const start = ((startAngle - 90) * Math.PI) / 180;
    const end = ((endAngle - 90) * Math.PI) / 180;
    const x1 = 50 + radius * Math.cos(start);
    const y1 = 50 + radius * Math.sin(start);
    const x2 = 50 + radius * Math.cos(end);
    const y2 = 50 + radius * Math.sin(end);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square ${className}`}
    >
      {/* Outer rotation wheel */}
      <div
        className="absolute inset-0 rounded-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ touchAction: "none" }}
      >
        {/* Sleek wheel design with SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {/* Outer glow ring */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#wheelGlow)"
            strokeWidth="0.5"
            opacity="0.5"
          />

          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#2D2D2D"
            strokeWidth="2"
          />

          {/* Progress arc - shows current position */}
          {normalizedAngle > 0 && (
            <path
              d={createArcPath(0, normalizedAngle, 46)}
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}

          {/* Small dots at cardinal points */}
          {[0, 90, 180, 270].map((angle) => {
            const radian = ((angle - 90) * Math.PI) / 180;
            const x = 50 + 46 * Math.cos(radian);
            const y = 50 + 46 * Math.sin(radian);
            return (
              <circle
                key={angle}
                cx={x}
                cy={y}
                r="1.5"
                fill={normalizedAngle >= angle ? "#00B4D8" : "#3D3D3D"}
              />
            );
          })}

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0077B6" />
              <stop offset="100%" stopColor="#00B4D8" />
            </linearGradient>
            <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
              <stop offset="80%" stopColor="#0077B6" stopOpacity="0" />
              <stop offset="100%" stopColor="#0077B6" stopOpacity="0.3" />
            </radialGradient>
            <radialGradient id="handleGradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#00B4D8" />
              <stop offset="100%" stopColor="#0077B6" />
            </radialGradient>
          </defs>
        </svg>

        {/* Wheel handle/knob */}
        <motion.div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: `rotate(${wheelAngle}deg) translateY(-46%) rotate(-${wheelAngle}deg)`,
            transformOrigin: "center center",
          }}
          animate={{
            scale: isDragging ? 1.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Handle outer ring */}
          <div
            className={`w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-gradient-to-br from-[#00B4D8] to-[#0077B6] shadow-lg ${
              isDragging ? "shadow-[#00B4D8]/50" : "shadow-[#0077B6]/30"
            }`}
          >
            {/* Handle inner circle */}
            <div className="absolute inset-1 rounded-full bg-white/90" />
          </div>
        </motion.div>

        {/* Subtle glow effect when dragging */}
        {isDragging && (
          <div className="absolute inset-2 rounded-full bg-[#00B4D8]/5 pointer-events-none" />
        )}
      </div>

      {/* Product image container (inside the wheel) */}
      <div className="absolute inset-[8%] rounded-full overflow-hidden bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]">
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Product view ${index + 1}`}
              fill
              className={`object-contain p-4 ${
                index === currentFrame ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 80vw, 40vw"
              priority={index < 2}
              draggable={false}
            />
          ))}
        </motion.div>
      </div>

      {/* Instruction hint - only show initially */}
      {!isDragging && normalizedAngle === 0 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
            <svg className="w-4 h-4 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-white/90 text-sm">Drag to explore</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
