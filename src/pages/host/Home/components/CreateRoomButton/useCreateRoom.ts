import { getGameRoomPassword } from '@apis/api/game';
import { useSocket } from '@contexts/SocketContext';
import { roomCodeState } from '@states/host/roomSetState';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const useCreateRoom = () => {
  const navigate = useNavigate();
  const setRoomCode = useSetRecoilState(roomCodeState); // 전역 변수 방코드
  const { setIsConnected } = useSocket();

  const handleClickCreateRoomButton = async () => {
    const roomPW = await getGameRoomPassword();
    if (roomPW.status === 200) {
      setIsConnected(true);
      setRoomCode(roomPW.data.roomCode);
      navigate('/host/room/wait', { state: { roomPW: roomPW.data.roomCode } });
    }
  };

  return { handleClickCreateRoomButton };
};

export default useCreateRoom;
