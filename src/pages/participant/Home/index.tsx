import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './swipeStyles.css';
import { leaveGameRoom } from '@apis/api/game';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  roomCodeState,
  currentRoundState,
  roomSetState,
} from '@states/host/roomSetState';
import { Beforeunload } from 'react-beforeunload';
import { selectedCompanyStockState } from '@states/participant/modalState';
import Splash from './Splash';
import UserForm from './UserForm';
import ParticipantsGameLobby from './GameLobby';
import UserProfile from '@components/UserProfile';
import { useSocket } from '@contexts/SocketContext';
import useModalState from '@hooks/useModalState';

export default function Home() {
  const swiperRef = useRef<SwiperRef>(null);
  const { socket, sendMessage } = useSocket();
  const { closeModal } = useModalState();

  const resetselectedCompanyStockState = useResetRecoilState(
    selectedCompanyStockState
  );
  const resetRoomSet = useResetRecoilState(roomSetState);
  const resetCurrentRound = useResetRecoilState(currentRoundState);

  const [pwCompare, setPwCompare] = useState<{
    text: string;
    state: boolean | undefined;
  }>({
    text: '프로필을 눌러 설정해주세요',
    state: undefined,
  }); // 패스워드 일치 여부

  const [toastMessageState, setToastMessageState] = useState(false);
  const [allowSlidePrev, setAllowSlidePrev] = useState(true);
  const [allowSlideNext, setAllowSlideNext] = useState(true);
  const [roomCode, setPersistRoomCode] = useRecoilState(roomCodeState);

  // 방 나가기
  const leaveRoom = async () => {
    if (!socket) return;
    if (roomCode) {
      const result = await leaveGameRoom(roomCode);
      if (result.status !== 200) {
        console.error('오류 발생. 게임방에서 나가지 못했습니다.');
        return;
      }
      console.log(roomCode);
      sendMessage('/app/room/participants', { roomCode });
      // sendMessage('/app/room/leave', { roomCode });
      // socket.emit('getParticipants', roomCode);
      // socket.emit('leaveRoom', roomCode);
    }
    // 전역변수 값들 초기화
    resetselectedCompanyStockState();
    resetRoomSet();
    resetCurrentRound();
  };

  // 방 나가는 기능
  const handleClickBackButton = () => {
    leaveRoom();
    setPwCompare({
      text: '프로필을 눌러 설정해주세요.',
      state: undefined,
    });
    setPersistRoomCode(null);
    setAllowSlidePrev(true);
    setToastMessageState(true);
  };

  // 모바일 브라우저 네비게이션바 같은 것들 고려해서 추가
  useEffect(() => {
    const getScreenSize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', getScreenSize);
    return () => {
      window.removeEventListener('resize', getScreenSize);
    };
  }, []);

  // 새로고침의 경우를 위해 세션에 해당하는 유저 제거 + 세션 제거 + roomCode 초기화
  useEffect(() => {
    leaveRoom();
    setPersistRoomCode(null);
    closeModal('participantGameModal');
  }, []);

  // 토스트 메시지 동작
  useEffect(() => {
    if (toastMessageState === true) {
      swiperRef?.current?.swiper?.slidePrev();
      setTimeout(async () => {
        setToastMessageState(false);
      }, 3000);
    }
  }, [toastMessageState]);

  return (
    <Beforeunload onBeforeunload={() => '새로고침하면 방에서 나가집니다.'}>
      <MainLayout>
        <UserProfile />

        <Swiper
          ref={swiperRef}
          pagination={true}
          modules={[Pagination]}
          allowSlideNext={allowSlideNext}
          allowSlidePrev={allowSlidePrev}
          onSlideChange={() => {
            if (swiperRef.current?.swiper.activeIndex === 0) {
              // 첫 번째 슬라이드
              setAllowSlideNext(true);
            } else if (swiperRef.current?.swiper.activeIndex === 1) {
              // 두 번째 슬라이드
              setAllowSlideNext(false);
            } else if (swiperRef.current?.swiper.activeIndex === 2) {
              // 세 번째 슬라이드
              setAllowSlideNext(false);
              setAllowSlidePrev(false);
            }
          }}
        >
          <SwiperSlide>
            <Splash />
          </SwiperSlide>
          <SwiperSlide>
            <UserForm
              setAllowSlideNext={setAllowSlideNext}
              swiperRef={swiperRef}
              pwCompare={pwCompare}
              setPwCompare={setPwCompare}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ParticipantsGameLobby
              handleClickBackButton={handleClickBackButton}
            />
          </SwiperSlide>
        </Swiper>
        <ToastMessage $state={toastMessageState}>
          <p>방에서 나가졌습니다.</p>
        </ToastMessage>
      </MainLayout>
    </Beforeunload>
  );
}

const MainLayout = styled.main`
  background: linear-gradient(
    108deg,
    #3f51b5 4.42%,
    #00bcd4 99.95%,
    #03a9f4 99.95%
  );
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  min-height: 600px; // 모바일에서 pagination 올라오는 거 방지
`;

const ToastMessage = styled.div<{ $state: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1d5190;
  width: 200px;
  height: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 70px;
  border-radius: 30px;
  opacity: ${(props) => (props.$state ? '0.9' : '0')};
  transition: opacity 2s ease;
  z-index: 50;
  pointer-events: none;

  & > p {
    color: #ffffff;
    font-size: 1.4rem;
  }
`;
