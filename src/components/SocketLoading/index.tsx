import { useSocket } from '@contexts/SocketContext';
import { roomCodeState } from '@states/host/roomSetState';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { rotatedImage } from '@styles/animation';

export default function SocketLoading() {
  const { state } = useLocation();
  const { socket, sendMessage, isConnect } = useSocket();
  const setRoomCode = useSetRecoilState(roomCodeState);
  const [connectTimeout, setConnectTimeout] = useState(false);

  useEffect(() => {
    if (state?.roomPW && socket) {
      setRoomCode(state.roomPW);
      sendMessage('/app/room/connect', { roomCode: state.roomPW });
    }
  }, [state, socket]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isConnect) {
        setConnectTimeout(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isConnect]);

  return (
    <SocketLoadingContainer>
      {connectTimeout ? (
        <ReconnectWrapper>
          <h3>알림</h3>
          <p>연결이 지연되고 있어요.</p>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </ReconnectWrapper>
      ) : (
        <>
          <img src="/images/loading-image.png" />
          <p>연결중입니다. 잠시만 기다려주세요</p>
        </>
      )}
    </SocketLoadingContainer>
  );
}

const SocketLoadingContainer = styled.div`
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

const ReconnectWrapper = styled.div`
  margin-top: 0.5rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  font-size: 2.2rem;
  padding: 2rem 10rem 2rem 10rem;
  display: flex;
  flex-direction: column;
  color: #303030;
  gap: 2rem;
  border-radius: 2rem;

  & > h3 {
    font-size: 2.2rem;
    font-weight: 600;
    color: #007bff;
  }

  button {
    width: 100%;
    margin-top: 0.5rem;
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 2rem;
    cursor: pointer;
  }
`;
