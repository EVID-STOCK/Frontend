import useModalState from '@hooks/useModalState';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';
import { useSwiper } from '../contexts/SwiperContext';
import useNoticeToast from './useNoticeToast';

export default function useHome() {
  const {
    swiperRef,
    handleChangeSlide,
    isAllowSlidePrev,
    isAllowSlideNext,
    allowSlidePrev,
    allowSlideNext,
    slideNext,
  } = useSwiper();
  const { toastMessageState } = useNoticeToast();

  const { closeModal } = useModalState();
  const setPersistRoomCode = useSetRecoilState(roomCodeState);

  useEffect(() => {
    const initialHomeState = () => {
      closeModal('participantGameModal');
      // setPersistRoomCode(null);
    };
    // 모바일 브라우저 네비게이션바 같은 것들 고려해서 추가
    const getScreenSize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    initialHomeState();
    window.addEventListener('resize', getScreenSize);
    return () => {
      window.removeEventListener('resize', getScreenSize);
    };
  }, []);

  return {
    swiperRef,
    toastMessageState,
    handleChangeSlide,
    isAllowSlidePrev,
    isAllowSlideNext,
    allowSlideNext,
    allowSlidePrev,
    slideNext,
  };
}
