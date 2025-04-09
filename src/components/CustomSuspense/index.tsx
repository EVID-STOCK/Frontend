import { DelayedSuspense } from '@components/DelayedSuspense';
import ErrorFallback from '@components/ErrorFallback';
import LoadingFallback from '@components/LoadingFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';

export default function CustomSuspense({
  children,
}: {
  children: React.ReactNode;
}) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <DelayedSuspense fallback={<LoadingFallback />}>
        {children}
      </DelayedSuspense>
    </ErrorBoundary>
  );
}
