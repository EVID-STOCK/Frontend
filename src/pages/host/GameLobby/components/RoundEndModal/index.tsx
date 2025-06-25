import { updateNextRound } from '@apis/api/game';
import { imageAlert, networkErrorAlert } from '@utils/customAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import { Timer } from 'types/room';
import * as S from './styles';
import useModalState from '@hooks/useModalState';
import { useSocket } from '@contexts/SocketContext';

export default function RoundEndModal({
  setTimer,
}: {
  setTimer: React.Dispatch<React.SetStateAction<Timer>>;
}) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModalState();
  const { sendMessage } = useSocket();

  // 다음 라운드로 넘어가는 기능
  const goNextRound = async () => {
    const result = await updateNextRound(state.roomPW);
    if (result.status === 200) {
      if (result.data.data.state === 'next') {
        openModal('hostGameModal', 'game');
        setTimer({ min: null, sec: null });
        sendMessage(`/app/game`, {
          data: { roomCode: state.roomPW },
          type: 'TIMER_START',
        });
      } else {
        // 모든 라운드가 끝났을 경우
        closeModal('hostGameModal');
        imageAlert();
        setTimeout(async () => {
          navigate('/host/room/result', {
            state: { roomPW: state.roomPW },
            replace: true,
          });
        }, 2300);
        return;
      }
    } else if (result.status === 500) {
      networkErrorAlert();
      return;
    }
  };

  return (
    <S.RoundEndModalContainer>
      <p>라운드 종료</p>
      <S.ActionButtonWrapper>
        <button
          onClick={() => {
            navigate('/host/room/result', {
              state: { roomPW: state.roomPW },
            });
          }}
        >
          결과 조회
        </button>
        <button onClick={goNextRound}>다음 라운드</button>
      </S.ActionButtonWrapper>
    </S.RoundEndModalContainer>
  );
}
