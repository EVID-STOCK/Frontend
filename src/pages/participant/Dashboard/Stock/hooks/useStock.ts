import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';
import { useQueryClient } from 'react-query';
import { useSocket } from '@contexts/SocketContext';

export default function useStock() {
  const roomCode = useRecoilValue(roomCodeState);
  const queryClient = useQueryClient();
  const { registerCallback } = useSocket();

  useEffect(() => {
    const handleUpdateStockList = () => {
      queryClient.invalidateQueries(['stockList']); // 주식 목록 갱신
    };

    registerCallback('STOCK_GRAPH', handleUpdateStockList);
  }, [roomCode]);
}
