'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
  };

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmM2Y0ZjYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNlNWU3ZWIiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PC9zdmc+';

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-muted',
        className
      )}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{
            backgroundImage: `url(${blurDataURL || defaultBlurDataURL})`,
          }}
        />
      )}
      
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted via-muted/50 to-muted animate-pulse" />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            'absolute inset-0 w-full h-full object-cover'
          )}
        />
      )}
    </div>
  );
}

// Progressive image component with multiple sources
interface ProgressiveImageProps extends OptimizedImageProps {
  srcSet?: string;
  sizes?: string;
}

export function ProgressiveImage({
  src,
  srcSet,
  sizes,
  ...props
}: ProgressiveImageProps) {
  return (
    <picture>
      {/* WebP source */}
      {srcSet && (
        <source
          srcSet={srcSet.replace(/\.(jpg|jpeg|png)/g, '.webp')}
          sizes={sizes}
          type="image/webp"
        />
      )}
      
      {/* AVIF source (modern browsers) */}
      {srcSet && (
        <source
          srcSet={srcSet.replace(/\.(jpg|jpeg|png)/g, '.avif')}
          sizes={sizes}
          type="image/avif"
        />
      )}
      
      <OptimizedImage src={src} {...props} />
    </picture>
  );
}