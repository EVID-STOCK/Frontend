import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';
import { getStockList } from '@apis/api/wallet';
import { useQuery } from 'react-query';
import SlidingPanel from '@pages/participant/Dashboard/components/SlidingPanel';
import PurchasePanel from '@pages/participant/Dashboard/PurchasePanel';
import StockListItem from './components/StockListItem';
import * as S from './styles';
import { useQueryClient } from 'react-query';
import { useSocket } from '@contexts/SocketContext';

function Stock() {
  const roomCode = useRecoilValue(roomCodeState);
  const queryClient = useQueryClient();
  const { registerCallback } = useSocket();

  const { data: stockList } = useQuery(
    ['stockList', roomCode],
    () => getStockList(roomCode!),
    {
      enabled: !!roomCode,
      retry: 1,
      suspense: true,
      useErrorBoundary: true,
    }
  );

  useEffect(() => {
    const handleUpdateStockList = () => {
      queryClient.invalidateQueries(['stockList']); // 주식 목록 갱신
    };

    registerCallback('STOCK_GRAPH', handleUpdateStockList);
  }, [roomCode]);

  return (
    <>
      <S.StockListContainer>
        <h3>주식 목록</h3>
        <S.StockListWrapper>
          {stockList?.data.map((stock, index) => {
            return (
              <StockListItem
                key={stock.companyName}
                stock={stock}
                index={index}
              />
            );
          })}
        </S.StockListWrapper>
      </S.StockListContainer>
      <SlidingPanel>
        <PurchasePanel />
      </SlidingPanel>
    </>
  );
}

export default React.memo(Stock);
