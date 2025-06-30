import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSocket } from '@contexts/SocketContext';
import useModalState from '@hooks/useModalState';
import { useUpdateNextRoundQuery } from '@hooks/queries/useUpdateNextRoundQuery';
import { useEffect } from 'react';

export function useNextRound() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { sendMessage } = useSocket();
  const { openModal } = useModalState();
  const {
    mutate: updateNextRoundMutate,
    isSuccess,
    data: updateNextRoundData,
  } = useUpdateNextRoundQuery();

  const goNextRound = async () => {
    updateNextRoundMutate(state.roomPW);
  };

  useEffect(() => {
    if (!isSuccess) return;

    if (updateNextRoundData.data.state === 'next') {
      openModal('hostGameModal', 'game');
      sendMessage(`/app/game`, {
        data: { roomCode: state.roomPW },
        type: 'TIMER_START',
      });
      navigate(-1); // 게임 대기방으로 다시 돌아감.
    } else {
      Swal.fire({
        title: '게임이 종료되었습니다.',
        text: '정말로 나가시겠습니까? 게임 결과창을 다시 볼 수 없습니다.',
        width: 600,
        imageWidth: 200,
        imageHeight: 200,
        imageUrl: '/images/error-image.png',
        showCancelButton: true,
        confirmButtonColor: '#A7C2E4',
        cancelButtonColor: '#ec7272',
        confirmButtonText: 'OK',
        cancelButtonText: '취소',
        padding: '4em 0rem 4em',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          sendMessage(`/app/game`, {
            data: { roomCode: state.roomPW },
            type: 'GAME_END',
          });
          navigate('/', { replace: true });
        }
      });
    }
  }, [isSuccess]);

  return { goNextRound };
}
