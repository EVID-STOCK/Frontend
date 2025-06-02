import ErrorFallback from '@components/ErrorFallback';
import { useEffect, useState, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

interface DelayedSuspenseProps {
  fallback: ReactNode;
  delay?: number;
  children: ReactNode;
}

export const DelayedSuspense = ({
  fallback,
  delay = 0,
  children,
}: DelayedSuspenseProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={showFallback ? fallback : null}>{children}</Suspense>
    </ErrorBoundary>
  );
};
