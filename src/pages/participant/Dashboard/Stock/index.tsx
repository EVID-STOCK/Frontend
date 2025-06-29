import React from 'react';
import PurchasePanel from '@pages/participant/Dashboard/Stock/PurchasePanel';
import StockListItem from './components/StockListItem';
import * as S from './styles';
import useStock from './hooks/useStock';
import useGetStockListQuery from './hooks/useGetStockListQuery';
import SlidingPanel from '../components/SlidingPanel';

function Stock() {
  const { data: stockListData } = useGetStockListQuery();
  useStock();

  return (
    <>
      <S.StockListContainer>
        <h3>주식 목록</h3>
        <S.StockListWrapper>
          {stockListData?.data.map((stock, index) => {
            return <StockListItem stock={stock} index={index} />;
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
