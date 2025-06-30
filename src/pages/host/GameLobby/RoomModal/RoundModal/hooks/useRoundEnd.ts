import { useSocket } from '@contexts/SocketContext';
import { useUpdateNextRoundQuery } from '@hooks/queries/useUpdateNextRoundQuery';
import useModalState from '@hooks/useModalState';
import { imageAlert } from '@utils/customAlert';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer } from 'types/room';

const MODAL_KEY = 'hostGameModal';

export function useRoundEnd(
  setTimer: React.Dispatch<React.SetStateAction<Timer>>
) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalState();
  const { sendMessage } = useSocket();
  const {
    mutate: updateNextRoundMutate,
    isSuccess,
    data: updateNextRoundData,
  } = useUpdateNextRoundQuery();

  const handleGoToResult = () => {
    navigate('/host/room/result', {
      state: { roomPW: state.roomPW },
    });
  };

  const handleAllRoundsEnd = () => {
    closeModal(MODAL_KEY);
    imageAlert();
    setTimeout(() => {
      navigate('/host/room/result', {
        state: { roomPW: state.roomPW },
        replace: true,
      });
    }, 2300);
  };

  const startNextRound = () => {
    openModal('hostGameModal', 'game');
    setTimer({ min: null, sec: null });
    sendMessage(`/app/game`, {
      data: { roomCode: state.roomPW },
      type: 'TIMER_START',
    });
  };

  const handleNextRound = async () => {
    updateNextRoundMutate(state.roomPW);
  };

  useEffect(() => {
    if (!isSuccess) return;

    if (updateNextRoundData.data.state === 'next') {
      startNextRound();
    } else {
      handleAllRoundsEnd();
    }
  }, [isSuccess]);

  return {
    handleGoToResult,
    handleNextRound,
  };
}
