import { deleteGameRoom } from '@apis/api/game';
import { ApiResponse } from '@apis/types/api.types';
import { DeleteGameRoomResponse } from '@apis/types/game.types';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

interface DeleteRoomVariables {
  roomPW: string;
}

export const useDeleteRoomQuery = () => {
  return useMutation<
    ApiResponse<DeleteGameRoomResponse>,
    AxiosError,
    DeleteRoomVariables
  >(({ roomPW }: { roomPW: string }) => deleteGameRoom(roomPW));
};
