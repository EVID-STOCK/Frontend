import { createGameRoom } from '@apis/api/game';
import { roomCodeState } from '@states/host/roomSetState';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const useCreateRoomQuery = () => {
  const navigate = useNavigate();
  const setRoomCode = useSetRecoilState(roomCodeState);

  return useMutation(() => createGameRoom(), {
    onSuccess: (data) => {
      setRoomCode(data.data.roomCode);
      navigate('/host/room/wait', {
        state: { roomPW: data.data.roomCode },
      });
    },
    onError: (error) => {
      console.error('에러:', error);
    },
  });
};
