import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';
import { fetchParticipantList } from '@apis/api/game';

export const useGetParticipants = () => {
  const roomCode = useRecoilValue(roomCodeState);

  return useQuery(
    ['participants', roomCode],
    () => fetchParticipantList(roomCode!),
    {
      placeholderData: {
        success: true,
        message: 'placeholder',
        data: { participants: [] },
      },
      enabled: !!roomCode,
      retry: 1,
      suspense: true,
      useErrorBoundary: true,
    }
  );
};
