import * as S from './styles';
import { ExistStock } from 'types/stock';
import useStockClickHandler from './useStockClickHandler';

export default function StockListItem({ stock }: { stock: ExistStock }) {
  const { handleClickStockListItem } = useStockClickHandler();

  function getStockPercenetColor(percent: number) {
    if (percent > 0) return 'red';
    if (percent === 0) return 'black';
    return 'blue';
  }

  return (
    <S.StockListItem
      $color={getStockPercenetColor(stock.percent)}
      onClick={() => handleClickStockListItem(stock)}
    >
      <div>
        <p>{stock.com_name}</p>
        <p>{stock.count}주</p>
      </div>
      <div>
        <p>{stock.buy_average.toLocaleString('ko-KR')}</p>
        <p>{stock.percent.toFixed(2)}%</p>
      </div>
    </S.StockListItem>
  );
}
