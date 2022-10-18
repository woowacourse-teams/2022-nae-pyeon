import { useEffect, useRef } from "react";

interface UseIntersectParams {
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void;
  options?: IntersectionObserverInit;
}

const useIntersect = ({ onIntersect, options }: UseIntersectParams) => {
  const ref = useRef<HTMLDivElement>(null);
  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    });
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

export default useIntersect;
