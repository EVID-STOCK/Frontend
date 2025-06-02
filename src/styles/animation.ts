import { keyframes } from 'styled-components';

export const rotatedImage = () => keyframes`
  100% {
    transform: rotate(-360deg);
  }
`;

export const shimmer = keyframes`
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
`;
