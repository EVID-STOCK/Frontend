import { fetchStockGraph } from '@apis/api/stock';
import { roomCodeState } from '@states/host/roomSetState';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

export default function useGetStockGraphQuery() {
  const companyStock = useRecoilValue(selectedCompanyStockState);
  const persistRoomCode = useRecoilValue(roomCodeState);

  return useQuery(
    ['stockGraph', companyStock.id],
    () => fetchStockGraph(persistRoomCode!, companyStock.id!),
    {
      enabled: !!companyStock.id && !!persistRoomCode,
      refetchOnWindowFocus: false,
      select: (result) => Object.values(result.data).map((x) => x.stockPrice),
    }
  );
}
