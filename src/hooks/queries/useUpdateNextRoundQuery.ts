import { updateNextRound } from '@apis/api/game';
import { ApiResponse } from '@apis/types/api.types';
import { UpdateNextRoundResponse } from '@apis/types/game.types';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

interface UpdateNextRoundVariables {
  roomPW: string;
}

export const useUpdateNextRoundQuery = () => {
  return useMutation<
    ApiResponse<UpdateNextRoundResponse>,
    AxiosError,
    UpdateNextRoundVariables
  >(({ roomPW }: { roomPW: string }) => updateNextRound(roomPW));
};
