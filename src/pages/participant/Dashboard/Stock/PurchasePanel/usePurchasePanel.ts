import { useRecoilValue } from 'recoil';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { useNavigate } from 'react-router-dom';
import { currentRoundState } from '@states/host/roomSetState';
import useSlidingPanel from '@hooks/useSlidingPanel';

export default function usePurchasePanel() {
  const navigate = useNavigate();
  const companyStock = useRecoilValue(selectedCompanyStockState); // 모달에 들어가는 값
  const currentRound = useRecoilValue(currentRoundState);
  const { isSlidingOpen, closeSliding, setSlidingState } = useSlidingPanel();

  const getPreviousRoundStockPrice =
    currentRound === 1
      ? '-'
      : companyStock.firstMenuPrice.toLocaleString('ko-KR');

  const getCurrentRoundStockPrice =
    companyStock.secondMenuPrice.toLocaleString('ko-KR');

  const getStockPriceColor = () => {
    let color = '';
    const priceDifference =
      companyStock.secondMenuPrice - companyStock.firstMenuPrice;

    if (currentRound === 1) {
      color = 'black';
    } else {
      if (priceDifference > 0) {
        color = 'red';
      } else if (priceDifference < 0) {
        color = 'blue';
      } else {
        color = 'black';
      }
    }

    return color;
  };

  const getNotice = () => {
    let notice = '';
    const differece = companyStock.difference.toLocaleString('ko-KR');
    const percent = companyStock.percent;

    if (currentRound === 1) {
      notice = '이전 라운드가 없습니다.';
    } else {
      if (companyStock.difference >= 0) {
        notice = `전 라운드가 보다 ${differece}원(${percent}%)이 올랐어요`;
      } else {
        notice = `전 라운드가 보다 ${differece}원(${percent}%)이 내렸어요`;
      }
    }

    return notice;
  };

  const handleClickPurchaseButton = () => {
    closeSliding();
    setSlidingState('purchase');
    setTimeout(() => {
      navigate('/participant/purchase', { state: { permit: true } });
    }, 500);
  };

  return {
    companyName: companyStock.companyName,
    isSlidingOpen,
    getPreviousRoundStockPrice,
    getCurrentRoundStockPrice,
    getStockPriceColor,
    getNotice,
    handleClickPurchaseButton,
  };
}
