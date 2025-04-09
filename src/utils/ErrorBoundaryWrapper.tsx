import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import UnusualApproach from '@pages/UnusualApproach';
import styled from 'styled-components';
import { Suspense } from 'react';

const LoadingFallback = () => {
  return <LoadingFallbackStyle></LoadingFallbackStyle>;
};

const LoadingFallbackStyle = styled.section`
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
  width: 100vw;
  height: 100vh;
`;

export default function ErrorBoundaryWrapper() {
  return (
    <ErrorBoundary FallbackComponent={UnusualApproach}>
      <Suspense fallback={<LoadingFallback />}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
