import { saveGameResults } from '@apis/api/game';
import { ApiResponse } from '@apis/types/api.types';
import { SaveGameResultsResponse } from '@apis/types/game.types';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

interface SaveGameResultsVariables {
  roomPW: string;
  round: {
    round_num: number;
  };
}

export const useSaveRoomResultsQuery = () => {
  return useMutation<
    ApiResponse<SaveGameResultsResponse>,
    AxiosError,
    SaveGameResultsVariables
  >(({ roomPW, round }: SaveGameResultsVariables) =>
    saveGameResults(roomPW, round)
  );
};
