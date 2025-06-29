import { useRecoilState } from 'recoil';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { useNavigate } from 'react-router-dom';
import useSlidingPanel from '@hooks/useSlidingPanel';

export default function useTradeSlidingPanel() {
  const navigate = useNavigate();
  const [companyStock] = useRecoilState(selectedCompanyStockState); // 모달에 들어가는 값
  const { closeSliding, setSlidingState, isSlidingOpen } = useSlidingPanel();

  const handleClickPurchaseButton = () => {
    closeSliding();
    setSlidingState('purchase');
    setTimeout(() => {
      navigate('/participant/purchase', { state: { permit: true } });
    }, 500);
  };

  const handleClickSellButton = () => {
    closeSliding();
    setSlidingState('sell');
    setTimeout(() => {
      navigate('/participant/sell', { state: { permit: true } });
    }, 500);
  };

  const getAveragePurchase =
    companyStock.difference === 0
      ? '-'
      : companyStock.firstMenuPrice?.toLocaleString('ko-KR');

  const getCurrentRoundStockPrice =
    companyStock.secondMenuPrice?.toLocaleString('ko-KR');

  const getNotice = (value: number) => {
    const differece = companyStock.difference.toLocaleString('ko-KR');
    const percent = companyStock.percent;

    if (value >= 0) {
      return `평균 매입가 보다 ${differece}원(${percent.toFixed(
        2
      )}%)이 올랐어요`;
    } else {
      return `평균 매입가 보다 ${differece}원(${percent}%)이 내렸어요`;
    }
  };

  const getStockPriceColor = (value: number) => {
    if (value > 0) {
      return 'red';
    } else if (value < 0) {
      return 'blue';
    } else {
      return 'black';
    }
  };

  const getCurrentRoundStockPriceColor = getStockPriceColor(
    companyStock.secondMenuPrice - companyStock.firstMenuPrice
  );
  const getNoticeColor = getStockPriceColor(companyStock.difference);

  return {
    companyStock,
    getAveragePurchase,
    getCurrentRoundStockPrice,
    handleClickPurchaseButton,
    handleClickSellButton,
    getCurrentRoundStockPriceColor,
    getNoticeColor,
    isSlidingOpen,
    getNotice,
  };
}
