import { useEffect, useState } from 'react';
import { useSwiper } from '../contexts/SwiperContext';

export default function useNoticeToast() {
  const { slidePrev } = useSwiper();
  const [toastMessageState, setToastMessageState] = useState(false);

  const showToastMessage = () => {
    setToastMessageState(true);
  };

  // 토스트 메시지 동작
  useEffect(() => {
    if (toastMessageState === true) {
      slidePrev();
      setTimeout(async () => {
        setToastMessageState(false);
      }, 3000);
    }
  }, [toastMessageState]);

  return {
    toastMessageState,
    showToastMessage,
  };
}
