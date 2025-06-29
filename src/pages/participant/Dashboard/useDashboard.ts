import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { navbarState } from '@states/participant/navbarState';
import { currentRoundState, roomSetState } from '@states/host/roomSetState';
import { useSocket } from '@contexts/SocketContext';
import useModalState from '@hooks/useModalState';
import useSlidingPanel from '@hooks/useSlidingPanel';

export default function useDashboard() {
  const navigate = useNavigate();
  const { registerCallback, isConnect } = useSocket();
  const [selectedNav] = useRecoilState(navbarState);
  const [currentRound, setCurrentRound] = useRecoilState(currentRoundState);

  const setRoomSetting = useSetRecoilState(roomSetState);

  const { state: modalState, isOpen } = useModalState();
  const { isSlidingOpen, slidingState } = useSlidingPanel();

  useEffect(() => {
    if (!isConnect) return;

    registerCallback('GAME_END', () => {
      navigate('/participant', { replace: true });
    });
    registerCallback(`ROOM_ROUND`, (message: any) => {
      setCurrentRound(message.currentRound);
      setRoomSetting((prev) => ({
        ...prev,
        roundNum: message.totalRound,
      }));
    });
  }, [isConnect]);

  // (모달창 열린 후 or 라운드가 끝난 화면이 나올 경우) 배경 스크롤 불가능하도록 설정
  useEffect(() => {
    if (isSlidingOpen || isOpen('participantGameModal')) {
      //
      document.body.style.cssText = `
          position: fixed;
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, [isSlidingOpen, modalState('participantGameModal')]);

  return {
    gameModalVisible: isOpen('participantGameModal'),
    currentRound,
    slidingState,
    selectedNav,
  };
}
