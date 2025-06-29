import { getStockList } from '@apis/api/wallet';
import { roomCodeState } from '@states/host/roomSetState';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

export default function useGetStockListQuery() {
  const roomCode = useRecoilValue(roomCodeState);

  return useQuery(['stockList', roomCode], () => getStockList(roomCode!), {
    enabled: !!roomCode,
    retry: 1,
    suspense: true,
    useErrorBoundary: true,
  });
}
