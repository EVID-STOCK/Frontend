import { updateNextRound } from '@apis/api/game';
import { useSocket } from '@contexts/SocketContext';
import useModalState from '@hooks/useModalState';
import { imageAlert, networkErrorAlert } from '@utils/customAlert';
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

  const handleNextRound = () => {
    openModal('hostGameModal', 'game');
    setTimer({ min: null, sec: null });
    sendMessage(`/app/game`, {
      data: { roomCode: state.roomPW },
      type: 'TIMER_START',
    });
  };

  const goNextRound = async () => {
    const result = await updateNextRound(state.roomPW);
    if (result.status === 200) {
      if (result.data.data.state === 'next') {
        handleNextRound();
      } else {
        handleAllRoundsEnd();
      }
    } else if (result.status === 500) {
      networkErrorAlert();
    }
  };

  return {
    handleGoToResult,
    goNextRound,
  };
}
