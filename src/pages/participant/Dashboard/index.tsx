import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { navbarState } from '@states/participant/navbarState';
import { currentRoundState, roomSetState } from '@states/host/roomSetState';
import Timer from '../components/Timer';
import Wallet from './Wallet';
import News from './News';
import Stock from './Stock';
import Header from '../components/ParticipantHeader';
import { useSocket } from '@contexts/SocketContext';
import useModalState from '@hooks/useModalState';
import useSlidingPanel from '@hooks/useSlidingPanel';
import * as S from './styles';
import StockSkeleton from './Stock/components/StockSkeleton';
import { DelayedSuspense } from '@components/DelayedSuspense';

export default function Dashboard() {
  const navigate = useNavigate();
  const { registerCallback, isConnect } = useSocket();
  const [selectedNav] = useRecoilState(navbarState);
  const [round, setRound] = useRecoilState(currentRoundState); // 현재 라운드

  const setRoomSetting = useSetRecoilState(roomSetState);

  const { state: modalState, isOpen } = useModalState();
  const { isSlidingOpen, slidingState } = useSlidingPanel();

  useEffect(() => {
    if (!isConnect) return;

    // 게임 종료 → 결과 페이지로 이동
    registerCallback('GAME_END', () => {
      navigate('/participant', { replace: true });
    });

    // 라운드 정보 수신 → 상태 업데이트
    registerCallback(`ROOM_ROUND`, (message: any) => {
      setRound(message.currentRound);
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

  return (
    <S.DashboardContainer>
      <S.FinishModal $visible={isOpen('participantGameModal')}>
        <div>
          <img src="/images/loading-image.png" />
          <p>{round}라운드 종료</p>
        </div>
      </S.FinishModal>
      <Header navbar />
      <S.Main $state={slidingState}>
        <S.ContentSection>
          {selectedNav === 'wallet' && <Wallet />}
          {selectedNav === 'stock' && (
            <DelayedSuspense fallback={<StockSkeleton />} delay={0}>
              <Stock />
            </DelayedSuspense>
          )}
          {selectedNav === 'news' && (
            <DelayedSuspense fallback={<StockSkeleton />} delay={0}>
              <News />
            </DelayedSuspense>
          )}
        </S.ContentSection>
        <Timer />
      </S.Main>
    </S.DashboardContainer>
  );
}
