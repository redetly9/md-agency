'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = startXRef.current;
    
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentXRef.current = e.touches[0].clientX;
    const diff = currentXRef.current - startXRef.current;
    
    if (containerRef.current) {
      const x = diff - (currentIndex * window.innerWidth);
      containerRef.current.style.transform = `translateX(${x}px)`;
    }
  };

  const handleTouchEnd = () => {
    const diff = currentXRef.current - startXRef.current;
    
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.3s ease-out';
      
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        } else if (diff < 0 && currentIndex < images.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // Возвращаемся к текущему изображению
          containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
      } else {
        // Возвращаемся к текущему изображению при маленьком свайпе
        containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="relative bg-black">
      <Link href="/" className="absolute top-4 left-4 z-10 bg-white rounded-full p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </Link>

      <div 
        className="relative w-full h-[50vh] overflow-hidden touch-pan-x"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={containerRef}
          className="flex h-full transition-transform duration-300 ease-out"
        >
          {images.map((src, index) => (
            <img 
              key={index}
              src={src}
              alt=""
              className="w-full h-full object-cover flex-shrink-0"
              draggable={false}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
}
