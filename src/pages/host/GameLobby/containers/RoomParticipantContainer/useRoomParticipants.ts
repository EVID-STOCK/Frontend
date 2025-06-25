import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSocket } from '@contexts/SocketContext';
import { useQueryClient } from 'react-query';
import { useGetParticipants } from '@hooks/useParticipantsQuery';

export function useRoomParticipants() {
  const { isConnect, registerCallback } = useSocket();
  const { state } = useLocation();
  const queryClient = useQueryClient();
  const { data: participantListData } = useGetParticipants();

  useEffect(() => {
    if (!state?.roomPW || !isConnect) return;
    registerCallback('ROOM_JOIN', () => {
      queryClient.invalidateQueries(['participants']);
    });
    registerCallback('ROOM_LEAVE', () => {
      queryClient.invalidateQueries(['participants']);
    });
  }, [state?.roomPW, isConnect]);

  return { participants: participantListData?.data?.participants || [] };
}
