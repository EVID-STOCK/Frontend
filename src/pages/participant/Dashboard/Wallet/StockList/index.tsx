import * as S from './styles';
import { ExistStock } from 'types/stock';
import StockListEmptyState from './components/StockListEmptyState';
import StockListItem from './components/StockListItem';
import useStockList from './useStockList';

export default function StockList() {
  const { stockList } = useStockList();

  if (stockList.length === 0) {
    return <StockListEmptyState />;
  }

  return (
    <S.StockListContainer>
      <h3>주식 목록</h3>
      <S.StockListWrapper>
        {stockList.map((stock: ExistStock) => {
          return <StockListItem key={stock.id} stock={stock} />;
        })}
      </S.StockListWrapper>
    </S.StockListContainer>
  );
}
