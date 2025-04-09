import { useRecoilState } from 'recoil';
import ActionButton from '@pages/participant/components/ActionButton';
import LineChart from '@pages/participant/Dashboard/components/LineChart';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { useNavigate } from 'react-router-dom';
import useSlidingPanel from '@hooks/useSlidingPanel';
import * as S from './styles';

export default function TradingSlidingPanel({ panelRef }: any) {
  const navigate = useNavigate();
  const [companyStock] = useRecoilState(selectedCompanyStockState); // 모달에 들어가는 값
  const { closeSliding, setSlidingState, isSlidingOpen } = useSlidingPanel();

  const handleClickBuyButton = () => {
    closeSliding();
    setSlidingState('buy');
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

  return (
    <S.TradingSlidingPanelContainer $visible={isSlidingOpen} ref={panelRef}>
      <span></span>
      <div>
        <h2>{companyStock.companyName}</h2>
        <h2>{companyStock.inStock}주 보유</h2>
      </div>
      <LineChart />
      <S.StockPriceContainer
        $color={
          companyStock.secondMenuPrice - companyStock.firstMenuPrice > 0
            ? 'red'
            : companyStock.secondMenuPrice - companyStock.firstMenuPrice === 0
            ? 'black'
            : 'blue'
        }
      >
        <div>
          <p>평균 매입가</p>
          <p>
            {companyStock.difference === 0
              ? '-'
              : companyStock.firstMenuPrice?.toLocaleString('ko-KR')}
          </p>
        </div>
        <div>
          <p>현 라운드 가격</p>
          <p>{companyStock.secondMenuPrice?.toLocaleString('ko-KR')}</p>
        </div>
      </S.StockPriceContainer>
      <S.NoticeWrapper
        $color={
          companyStock.difference > 0
            ? 'red'
            : companyStock.difference === 0
            ? 'black'
            : 'blue'
        }
      >
        {companyStock.difference >= 0
          ? `평균 매입가 보다 ${companyStock.difference.toLocaleString(
              'ko-KR'
            )}원(${companyStock.percent.toFixed(2)}%)이 올랐어요`
          : `평균 매입가 보다 ${companyStock.difference.toLocaleString(
              'ko-KR'
            )}원(${companyStock.percent}%)이 내렸어요`}
      </S.NoticeWrapper>
      <S.ButtonWrapper>
        <ActionButton value="추가매수" onClick={handleClickBuyButton} />
        <ActionButton value="매도하기" onClick={handleClickSellButton} />
      </S.ButtonWrapper>
    </S.TradingSlidingPanelContainer>
  );
}
