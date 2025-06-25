import { getGameRoomPassword } from '@apis/api/game';
import { roomCodeState } from '@states/host/roomSetState';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const useCreateRoom = () => {
  const navigate = useNavigate();
  const setRoomCode = useSetRecoilState(roomCodeState);

  const handleClickCreateRoomButton = async () => {
    const response = await getGameRoomPassword();
    if (response.status === 200) {
      setRoomCode(response.data.roomCode);
      navigate('/host/room/wait', {
        state: { roomPW: response.data.roomCode },
      });
    }
  };

  return { handleClickCreateRoomButton };
};

export default useCreateRoom;
