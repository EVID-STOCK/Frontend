import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import UnusualApproach from '@pages/UnusualApproach';
import styled from 'styled-components';
import { Suspense, useEffect, useState } from 'react';
import ParticipantHeader from '@pages/participant/components/ParticipantHeader';
import { rotatedImage } from '@styles/animation';

const LoadingFallback = () => {
  return (
    <LoadingFallbackWrapper>
      <Overlay>
        <img src="/images/loading-image.png" />
      </Overlay>
      <ParticipantHeader navbar />
    </LoadingFallbackWrapper>
  );
};

const LoadingFallbackWrapper = styled.section`
  background-color: #e2e2e2;
  width: 100vw;
  height: 100vh;
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.36);

  & > img {
    width: 10rem;
    height: 10rem;
    animation: ${rotatedImage} 1s infinite linear;
  }
`;

export default function ErrorBoundaryWrapper() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={UnusualApproach}>
      <Suspense fallback={showFallback ? <LoadingFallback /> : null}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}
