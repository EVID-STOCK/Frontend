import { leaveGameRoom } from '@apis/api/game';
import { ApiResponse } from '@apis/types/api.types';
import { LeaveGameRoomResponse } from '@apis/types/game.types';
import { useSocket } from '@contexts/SocketContext';
import { roomCodeState } from '@states/host/roomSetState';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';

interface LeaveRoomVariables {
  roomPW: string;
}

export const useLeaveRoomQuery = () => {
  const { sendMessage } = useSocket();
  const roomCode = useRecoilValue(roomCodeState);

  return useMutation<
    ApiResponse<LeaveGameRoomResponse>,
    AxiosError,
    LeaveRoomVariables
  >(({ roomPW }: { roomPW: string }) => leaveGameRoom(roomPW), {
    onSuccess: () => {
      if (!roomCode) return;
      sendMessage(`/app/room`, { data: { roomCode }, type: 'ROOM_LEAVE' });
    },
    onError: () => {
      console.error('오류 발생. 게임방에서 나가지 못했습니다.');
    },
  });
};
