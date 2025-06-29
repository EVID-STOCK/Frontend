import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { SwiperRef } from 'swiper/react';

interface SwiperContextType {
  swiperRef: React.RefObject<SwiperRef | null>;
  isAllowSlidePrev: boolean;
  isAllowSlideNext: boolean;
  slideNext: () => void;
  slidePrev: () => void;
  handleChangeSlide: () => void;
  allowSlideNext: () => void;
  allowSlidePrev: () => void;
}

const SwiperContext = createContext<SwiperContextType | null>(null);

export const SwiperProvider = ({ children }: { children: React.ReactNode }) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [isAllowSlidePrev, setIsAllowSlidePrev] = useState(true);
  const [isAllowSlideNext, setIsAllowSlideNext] = useState(true);

  const handleChangeSlide = () => {
    const index = swiperRef.current?.swiper.activeIndex;

    if (index === 0) {
      setIsAllowSlideNext(true);
    } else if (index === 1) {
      setIsAllowSlideNext(false);
    } else if (index === 2) {
      setIsAllowSlideNext(false);
      setIsAllowSlidePrev(false);
    }
  };

  const allowSlidePrev = () => setIsAllowSlidePrev(true);
  const allowSlideNext = () => setIsAllowSlideNext(true);

  const slideNext = useCallback(() => {
    swiperRef.current?.swiper?.slideNext();
  }, []);

  const slidePrev = useCallback(() => {
    swiperRef.current?.swiper?.slidePrev?.();
  }, []);

  return (
    <SwiperContext.Provider
      value={{
        swiperRef,
        isAllowSlidePrev,
        isAllowSlideNext,
        slideNext,
        slidePrev,
        handleChangeSlide,
        allowSlidePrev,
        allowSlideNext,
      }}
    >
      {children}
    </SwiperContext.Provider>
  );
};

export const useSwiper = () => {
  const context = useContext(SwiperContext);
  if (!context) {
    throw new Error('useSwiper must be used within a SwiperProvider');
  }
  return context;
};
