import { joinGameRoom } from '@apis/api/game';
import { ApiResponse } from '@apis/types/api.types';
import { JoinGameRoomResponse, StudentInfo } from '@apis/types/game.types';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

interface JoinRoomVariables {
  roomPW: string;
  studentInfo: StudentInfo;
}

export const useJoinRoomQuery = () => {
  return useMutation<
    ApiResponse<JoinGameRoomResponse>,
    AxiosError,
    JoinRoomVariables
  >(({ roomPW, studentInfo }: { roomPW: string; studentInfo: StudentInfo }) =>
    joinGameRoom(roomPW, studentInfo)
  );
};
