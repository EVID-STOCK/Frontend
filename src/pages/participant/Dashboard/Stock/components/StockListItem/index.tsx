import { selectedCompanyStockState } from '@states/participant/modalState';
import { useSetRecoilState } from 'recoil';
import * as S from './styles';
import useSlidingPanel from '@hooks/useSlidingPanel';

interface Stock {
  companyName: string;
  currentPrice: number;
  difference: number;
  percent: number;
  previousPrice: number;
}

function StockListItem({
  stock: { companyName, previousPrice, currentPrice, difference, percent },
  index,
}: {
  stock: Stock;
  index: number;
}) {
  const setCompanyStock = useSetRecoilState(selectedCompanyStockState); // 모달창 값
  const { openSliding } = useSlidingPanel();

  const handleClickStockListItem = () => {
    setCompanyStock({
      id: index + 1,
      companyName: companyName,
      firstMenuPrice: previousPrice,
      secondMenuPrice: currentPrice,
      difference: difference,
      percent: percent,
    });
    openSliding();
  };

  return (
    <S.ListItem
      $color={percent > 0 ? 'red' : percent === 0 ? 'black' : 'blue'}
      key={companyName}
      onClick={handleClickStockListItem}
    >
      <div>
        <p>{companyName}</p>
      </div>
      <div>
        <p>{currentPrice.toLocaleString('ko-KR')}</p>
        <p>{percent}%</p>
      </div>
    </S.ListItem>
  );
}

export default StockListItem;
