import { useEffect, useState } from 'react';
import { NotifyRoundProps, Timer } from 'types/room';
import convertSecondsToMinute from '@utils/convertSecondsToMinute';
import { useLocation } from 'react-router-dom';
import { currentRoundState } from '@states/host/roomSetState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useModalState from '@hooks/useModalState';
import { useSocket } from '@contexts/SocketContext';
import { useSaveRoomResultsQuery } from './useSaveGameResultsQuery';

export const useManageRound = () => {
  const { state } = useLocation();
  // const navigate = useNavigate();
  const { registerCallback, sendMessage, isConnect } = useSocket();
  const [timer, setTimer] = useState<Timer>({ min: null, sec: null });
  const setRound = useSetRecoilState(currentRoundState);
  const { openModal, state: modalState } = useModalState();
  const round = useRecoilValue(currentRoundState); // 현재 라운드
  const { mutate: saveGameResultsMutate } = useSaveRoomResultsQuery();

  // 게임 결과 저장하기
  const saveGameResult = async (currentRound: number) => {
    // if (students.length < 2) {
    //   // 참여인원이 없을 경우 게임 결과를 저장하지 않고 메인 페이지로 이동
    //   imageAlert({
    //     title: `게임을 진행하고 있는 유저가 없습니다.`,
    //     text: '게임을 종료합니다.',
    //   });
    //   setTimeout(() => {
    //     navigate('/', { replace: true });
    //   }, 1000);
    //   return;
    // }
    saveGameResultsMutate({
      roomPW: state.roomPW,
      round: {
        round_num: currentRound,
      },
    });
  };

  useEffect(() => {
    if (!isConnect || !state.roomPW) return;

    registerCallback('TIMER_START', () => {
      sendMessage(`/app/room`, {
        data: { roomCode: state.roomPW },
        type: 'ROOM_ROUND',
      });
    });

    registerCallback('TIMER_TICK', (message: { remainingTime: number }) => {
      const { min, sec } = convertSecondsToMinute(message.remainingTime);
      setTimer({ min, sec });
    });

    registerCallback('TIMER_END', (currentRound: number) => {
      openModal('hostGameModal', 'gameover');
      saveGameResult(currentRound);
    });

    registerCallback(`ROOM_ROUND`, (message: NotifyRoundProps) => {
      setRound(message.currentRound);
    });
  }, [isConnect, state.roomPW]);

  return { modalState, timer, setTimer, round };
};
