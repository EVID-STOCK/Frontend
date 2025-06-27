import { useEffect } from 'react';
import { useSocket } from '@contexts/SocketContext';
import { useQueryClient } from 'react-query';
import { useGetParticipants } from '@hooks/useParticipantsQuery';

export function useRoomParticipants(roomPW?: string) {
  const { isConnect, registerCallback } = useSocket();
  const queryClient = useQueryClient();
  const { data: participantListData } = useGetParticipants();

  useEffect(() => {
    if (!roomPW || !isConnect) return;

    const invalidateParticiaptns = () =>
      queryClient.invalidateQueries(['participants']);
    registerCallback('ROOM_JOIN', invalidateParticiaptns);
    registerCallback('ROOM_LEAVE', invalidateParticiaptns);
  }, [roomPW, isConnect]);

  return { participants: participantListData?.data?.participants || [] };
}
