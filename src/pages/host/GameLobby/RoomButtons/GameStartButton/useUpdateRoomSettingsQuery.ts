import { updateRoomSettings } from '@apis/api/game';
import { ApiResponse } from '@apis/types/api.types';
import { UpdateRoomSettingsResponse } from '@apis/types/game.types';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { RoomSet } from 'types/room';

interface UpdateRoomSettingsVariables {
  roomPW: string;
  roomInfo: RoomSet;
}

export const useUpdateRoomSettingsQuery = () => {
  return useMutation<
    ApiResponse<UpdateRoomSettingsResponse>,
    AxiosError,
    UpdateRoomSettingsVariables
  >(({ roomPW, roomInfo }: { roomPW: string; roomInfo: RoomSet }) =>
    updateRoomSettings(roomPW, roomInfo)
  );
};
