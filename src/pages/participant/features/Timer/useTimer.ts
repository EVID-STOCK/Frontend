import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentRoundState,
  roomCodeState,
  roomSetState,
} from '@states/host/roomSetState';
import convertSecondsToMinute from '@utils/convertSecondsToMinute';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import useModalState from '@hooks/useModalState';
import useSlidingPanel from '@hooks/useSlidingPanel';
import { timerState } from '@states/timerState';
import { useSocket } from '@contexts/SocketContext';
import { useEffect } from 'react';

export default function useTimer() {
  const navigate = useNavigate();
  const { sendMessage, registerCallback, isConnect } = useSocket();
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
    sendMessage(`/app/room`, { data: { roomCode }, type: 'ROOM_ROUND' });
  };

  const hanldeTimerTick = (message: { remainingTime: number }) => {
    const { min, sec } = convertSecondsToMinute(message.remainingTime);
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
    if (!isConnect) return;

    registerCallback('TIMER_START', handleTimerStart);
    registerCallback('TIMER_TICK', hanldeTimerTick);
    registerCallback('TIMER_END', handleTimerEnd);
    registerCallback('TIMER_STOP', handleTimerStop);
    registerCallback('STOCK_GRAPH', handleUpdateStockGraph);
  }, [isConnect]);

  return {
    round,
    timer,
    roomSetting,
  };
}
