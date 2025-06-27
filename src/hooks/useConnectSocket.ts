import { useSocket } from '@contexts/SocketContext';
import { useEffect } from 'react';

export default function useConnectSocket(roomPW?: string) {
  const { isConnect, connectSocket } = useSocket();

  useEffect(() => {
    if (!roomPW) return;

    (async () => {
      try {
        await connectSocket(roomPW);
      } catch (error) {
        console.error('소켓 연결 실패:', error);
      }
    })();
  }, [roomPW]);

  return {
    isConnect,
  };
}
