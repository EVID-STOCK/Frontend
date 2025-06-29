import { selectedCompanyStockState } from '@states/participant/modalState';
import { useSetRecoilState } from 'recoil';
import useSlidingPanel from '@hooks/useSlidingPanel';
import { ExistStock } from 'types/stock';

export default function useStockClickHandler() {
  const setCompanyStock = useSetRecoilState(selectedCompanyStockState);
  const { openSliding } = useSlidingPanel();

  const handleClickStockListItem = (stock: ExistStock) => {
    setCompanyStock({
      id: stock.id as number,
      companyName: stock.com_name,
      inStock: stock.count,
      firstMenuPrice: stock.buy_average,
      secondMenuPrice: stock.current_price,
      percent: stock.percent,
      difference: stock.difference_price,
    });
    openSliding();
  };

  return {
    handleClickStockListItem,
  };
}
