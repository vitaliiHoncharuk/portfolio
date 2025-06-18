import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends Element = Element>(
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If triggerOnce and already triggered, don't create observer
    if (triggerOnce && hasTriggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && triggerOnce) {
          setHasTriggered(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, isIntersecting: isIntersecting || (triggerOnce && hasTriggered) };
}

// Hook for animating multiple elements with staggered delays
export function useStaggeredIntersectionObserver<T extends Element = Element>(
  count: number,
  options: UseIntersectionObserverOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const refs = useRef<(T | null)[]>(Array(count).fill(null));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(index);
              } else if (!triggerOnce) {
                newSet.delete(index);
              }
              return newSet;
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [threshold, rootMargin, triggerOnce]);

  const setRef = (index: number) => (element: T | null) => {
    refs.current[index] = element;
  };

  return {
    setRef,
    isVisible: (index: number) => visibleItems.has(index),
    visibleItems
  };
}