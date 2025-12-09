import React, { useRef, useState, useEffect, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImageSrc: string;
  afterImageSrc: string;
  width?: number; // Optional: specify fixed width
  height?: number; // Optional: specify fixed height
  alt?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImageSrc,
  afterImageSrc,
  width,
  height,
  alt = "Before and After Comparison"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // 0-100%
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const { left, width: containerWidth } = containerRef.current.getBoundingClientRect();
    let newPosition = ((e.clientX - left) / containerWidth) * 100;
    
    // Clamp position between 0 and 100
    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  }, [isDragging]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    if (e.touches.length === 0) return;

    const { left, width: containerWidth } = containerRef.current.getBoundingClientRect();
    let newPosition = ((e.touches[0].clientX - left) / containerWidth) * 100;

    newPosition = Math.max(0, Math.min(100, newPosition));
    setSliderPosition(newPosition);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl shadow-xl border border-slate-200"
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto', // Adjust height based on aspect ratio of images
        paddingBottom: height ? '0' : '65%', // Default aspect ratio, assumes 3:2, will be overwritten by image if no height specified
        cursor: isDragging ? 'ew-resize' : 'grab'
      }}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      role="slider" // Added for accessibility
      tabIndex={0} // Added for accessibility
      aria-valuenow={sliderPosition} // Added for accessibility
      aria-valuemin={0} // Added for accessibility
      aria-valuemax={100} // Added for accessibility
    >
      <img
        src={afterImageSrc}
        alt={`${alt} (After)`}
        className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none"
        onDragStart={(e) => e.preventDefault()}
        loading="lazy" // Added
      />
      <img
        src={beforeImageSrc}
        alt={`${alt} (Before)`}
        className="absolute top-0 left-0 w-full h-full object-cover select-none pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        onDragStart={(e) => e.preventDefault()}
        loading="lazy" // Added
      />

      <div
        className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center cursor-ew-resize select-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-8 h-8 bg-white rounded-full shadow-md border-2 border-slate-400 flex items-center justify-center">
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};