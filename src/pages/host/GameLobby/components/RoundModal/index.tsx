import { useEffect, useState } from 'react';
import { NotifyRoundProps, Timer } from 'types/room';
import ProgressModal from '../ProgressModal';
import RoundEndModal from '../RoundEndModal';
import convertSecondsToMinute from '@utils/convertSecondsToMinute';
import { useLocation } from 'react-router-dom';
import { currentRoundState } from '@states/host/roomSetState';
import { useSetRecoilState } from 'recoil';
import { postGameResult } from '@apis/api/game';
import { networkErrorAlert } from '@utils/customAlert';
import useModalState from '@hooks/useModalState';
import { useSocket } from '@contexts/SocketContext';

export default function RoundModal() {
  const { state } = useLocation();
  // const navigate = useNavigate();
  const { socket, subscribe, sendMessage, unsubscribe } = useSocket();
  const [timer, setTimer] = useState<Timer>({ min: null, sec: null });
  const setRound = useSetRecoilState(currentRoundState);
  const { openModal, state: modalState } = useModalState();

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
    const result = await postGameResult(state.roomPW, {
      round_num: currentRound,
    });
    if (result.status === 200) {
      return;
    } else {
      networkErrorAlert();
    }
  };

  useEffect(() => {
    if (!socket || !state.roomPW) return;
    const roomCode = state.roomPW;

    subscribe(`/topic/game/${roomCode}/timer-started`, () => {
      sendMessage('/app/round/get', { roomCode });
    });

    subscribe(`/topic/game/${roomCode}/timer-tick`, (remainingTime: number) => {
      const { min, sec } = convertSecondsToMinute(remainingTime);
      setTimer({ min, sec });
    });

    subscribe(`/topic/game/${roomCode}/timer-ended`, (currentRound: number) => {
      openModal('hostGameModal', 'gameover');
      saveGameResult(currentRound);
    });

    // 라운드 정보
    subscribe(
      `/topic/round/${roomCode}/notify`,
      ({ currentRound }: NotifyRoundProps) => {
        setRound(currentRound);
      }
    );

    return () => {
      unsubscribe(`/topic/game/${roomCode}/timer-started`);
      unsubscribe(`/topic/game/${roomCode}/timer-tick`);
      unsubscribe(`/topic/game/${roomCode}/timer-ended`);
      unsubscribe(`/topic/round/${roomCode}/notify`);
    };
  }, [socket, state.roomPW]);

  return (
    <>
      {modalState('hostGameModal') === 'game' ? (
        <ProgressModal timer={timer} />
      ) : (
        <RoundEndModal setTimer={setTimer} />
      )}
    </>
  );
}
