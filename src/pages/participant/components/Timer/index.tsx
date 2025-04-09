import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentRoundState,
  roomCodeState,
  roomSetState,
} from '@states/host/roomSetState';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import convertSecondsToMinute from '@utils/convertSecondsToMinute';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import useModalState from '@hooks/useModalState';
import useSlidingPanel from '@hooks/useSlidingPanel';
import { timerState } from '@states/timerState';
import { useSocket } from '@contexts/SocketContext';

function Timer() {
  const navigate = useNavigate();
  const { socket, subscribe, unsubscribe, sendMessage } = useSocket();
  const round = useRecoilValue(currentRoundState); // 현재 라운드
  const roomSetting = useRecoilValue(roomSetState); // 방에 세팅된 라운드
  const [timer, setTimer] = useRecoilState(timerState);
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModalState();
  const { closeSliding, setSlidingState } = useSlidingPanel();
  const [roomCode] = useRecoilState(roomCodeState); // 전역 변수 방코드

  const handleTimerStart = () => {
    // 타이머 시작되면 라운드 시작
    closeModal('participantGameModal');
    queryClient.invalidateQueries(['stockList']);
    queryClient.invalidateQueries(['userInfo']);
    queryClient.invalidateQueries(['newsList']);
    queryClient.invalidateQueries(['stockGraph']);
    sendMessage('/app/round/get', { roomCode });
  };

  const hanldeTimerTick = (info: number) => {
    const { min, sec } = convertSecondsToMinute(info);
    setTimer({ min, sec });
  };

  const handleTimerEnd = () => {
    // 타이머가 끝나면 해당 라운드 종료
    setTimer({ min: null, sec: null });
    openModal('participantGameModal', 'gameover');
    // 라운드가 종료될 때 슬라이딩이 열려있는 상태였다면 슬라이딩 닫아주기
    closeSliding();
    setSlidingState(null);
    navigate('/participant/wallet', { replace: true });
  };

  const handleTimerStop = () => {
    // 유저들이 방에서 빠져나가면 방 제거하라고 알림.
    // networkErrorAlert('사라진 게임방입니다.');
    // setTimeout(() => {
    //   navigate('/participant', { replace: true });
    // }, 1000);
    navigate('/participant', { replace: true });
  };

  const handleUpdateStockGraph = () => {
    queryClient.invalidateQueries(['stockGraph']);
  };

  useEffect(() => {
    if (!socket || !roomCode) return;

    subscribe(`/topic/game/${roomCode}/timer-started`, handleTimerStart);
    subscribe(`/topic/game/${roomCode}/timer-tick`, hanldeTimerTick);
    subscribe(
      `/topic/game/${roomCode}/update-stock-graph`,
      handleUpdateStockGraph
    );
    subscribe(`/topic/game/${roomCode}/timer-ended`, handleTimerEnd);
    subscribe(`/topic/game/${roomCode}/timer-stopped`, handleTimerStop);

    return () => {
      unsubscribe(`/topic/game/${roomCode}/timer-started`);
      unsubscribe(`/topic/game/${roomCode}/timer-tick`);
      unsubscribe(`/topic/game/${roomCode}/update-stock-graph`);
      unsubscribe(`/topic/game/${roomCode}/timer-ended`);
      unsubscribe(`/topic/game/${roomCode}/timer-stopped`);
    };
  }, [socket, roomCode]);

  return (
    <TimerSection>
      <p>
        {round} / {roomSetting.round_num} 라운드
      </p>
      <p>
        {timer.min !== null && timer.sec !== null
          ? timer.min + ':' + timer.sec
          : '00:00'}
      </p>
    </TimerSection>
  );
}

export default React.memo(Timer);

const TimerSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 0.7rem 2.4rem;
  border-radius: 1.6rem;

  & > p {
    color: #000000;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
