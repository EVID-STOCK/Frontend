import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './swipeStyles.css';
import { Beforeunload } from 'react-beforeunload';
import UserProfile from '@components/UserProfile';
import ToastMessage from './components/ToastMessage';
import * as S from './styles';
import useHome from './hooks/useHome';
import Splash from './Splash';
import UserForm from './UserForm';
import GameLobby from './GameLobby';
import { SwiperProvider } from './contexts/SwiperContext';

export default function ParticipantHomePage() {
  return (
    <SwiperProvider>
      <ParticipantHomePageContent />
    </SwiperProvider>
  );
}

function ParticipantHomePageContent() {
  const {
    swiperRef,
    toastMessageState,
    handleChangeSlide,
    isAllowSlidePrev,
    isAllowSlideNext,
  } = useHome();

  return (
    <Beforeunload onBeforeunload={() => '새로고침하면 방에서 나가집니다.'}>
      <S.ParticipantHomeContainer>
        <UserProfile />

        <Swiper
          ref={swiperRef}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          allowSlideNext={isAllowSlideNext}
          allowSlidePrev={isAllowSlidePrev}
          onSlideChange={handleChangeSlide}
        >
          <SwiperSlide>
            {/* 1. 입장 인트로 화면 */}
            <Splash />
          </SwiperSlide>
          <SwiperSlide>
            {/* 2. 사용자 정보 입력 */}
            <UserForm />
          </SwiperSlide>
          <SwiperSlide>
            {/* 3. 게임 로비 */}
            <GameLobby />
          </SwiperSlide>
        </Swiper>
        <ToastMessage state={toastMessageState} />
      </S.ParticipantHomeContainer>
    </Beforeunload>
  );
}
