import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSocket } from '@contexts/SocketContext';
import { Student } from 'types/room';

interface Message {
  status?: string;
  message?: string;
  participants?: Student[];
}

export function useRoomParticipants({
  setParticipants,
}: {
  setParticipants: React.Dispatch<React.SetStateAction<Student[]>>;
}) {
  const { subscribe, sendMessage, isConnect } = useSocket();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.roomPW || !isConnect) return;

    const handleUpdateParticipants = (message: Message) => {
      if (!message.status && message.participants) {
        setParticipants(message.participants);
      }
    };

    subscribe(
      `/topic/room/participants/${state.roomPW}`,
      handleUpdateParticipants
    );
    sendMessage('/app/room/participants', { roomCode: state.roomPW });
  }, [state?.roomPW, isConnect]);
}
