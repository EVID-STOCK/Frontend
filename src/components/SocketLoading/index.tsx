import styled from 'styled-components';
import { rotatedImage } from 'styles/animation';

export default function SocketLoading() {
  return (
    <SocketLoadingContainer>
      <img src="/icons/loading_icon.png" />
      <p>연결중입니다. 잠시만 기다려주세요</p>
    </SocketLoadingContainer>
  );
}

export const SocketLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.72);
  position: fixed;
  z-index: 1000;
  inset: 0;
  gap: 4rem;
  font-size: 2.5rem;
  color: white;

  & > img {
    width: 10rem;
    height: 10rem;
    animation: ${rotatedImage} 1s infinite linear;
  }
`;
