import { useEffect } from 'react';
import { useSocket } from '@contexts/SocketContext';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

export default function useRoomSocket() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { registerCallback } = useSocket();

  useEffect(() => {
    registerCallback('GAME_START', () => {
      navigate('wallet', {
        state: { permit: true },
      });
    });
    registerCallback('ROOM_JOIN', () => {
      queryClient.invalidateQueries(['participants']);
    });
    registerCallback('ROOM_LEAVE', () => {
      queryClient.invalidateQueries(['participants']);
    });
  }, []);
}
