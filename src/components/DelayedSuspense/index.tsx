import React, { useEffect, useState, ReactNode, Suspense } from 'react';

interface DelayedSuspenseProps {
  fallback: ReactNode;
  delay?: number;
  children: ReactNode;
}

export const DelayedSuspense = ({
  fallback,
  delay = 1000,
  children,
}: DelayedSuspenseProps) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Suspense fallback={showFallback ? fallback : null}>{children}</Suspense>
  );
};
