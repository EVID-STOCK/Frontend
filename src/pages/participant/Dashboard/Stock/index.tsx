import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';
import { getStockList } from '@apis/api/wallet';
import { useQuery, useQueryErrorResetBoundary } from 'react-query';
import SlidingPanel from '@pages/participant/Dashboard/components/SlidingPanel';
import PurchasePanel from '@pages/participant/Dashboard/PurchasePanel';
import StockListItem from './components/StockListItem';
import * as S from './styles';
import { useQueryClient } from 'react-query';
import { useSocket } from '@contexts/SocketContext';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@components/ErrorFallback';
import LoadingFallback from '@components/LoadingFallback';
import { DelayedSuspense } from '@components/DelayedSuspense';

function Stock() {
  const roomCode = useRecoilValue(roomCodeState);
  const queryClient = useQueryClient();
  const { subscribe, unsubscribe } = useSocket();
  const { reset } = useQueryErrorResetBoundary();

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

    subscribe(
      `/topic/room/${roomCode}/update-stock-list`,
      handleUpdateStockList
    );

    return () => {
      unsubscribe(`/topic/room/${roomCode}/update-stock-list`);
    };
  }, [roomCode]);

  return (
    <>
      <S.StockListContainer>
        <h3>주식 목록</h3>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <DelayedSuspense fallback={<LoadingFallback />} delay={0}>
            <S.StockListWrapper>
              {stockList?.map((stock, index) => {
                return (
                  <StockListItem
                    key={stock.companyName}
                    stock={stock}
                    index={index}
                  />
                );
              })}
            </S.StockListWrapper>
          </DelayedSuspense>
        </ErrorBoundary>
      </S.StockListContainer>
      <SlidingPanel>
        <PurchasePanel />
      </SlidingPanel>
    </>
  );
}

export default React.memo(Stock);
