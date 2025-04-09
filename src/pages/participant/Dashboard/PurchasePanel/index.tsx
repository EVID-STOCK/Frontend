import { useRecoilValue } from 'recoil';
import LineChart from '@pages/participant/Dashboard/components/LineChart';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { useNavigate } from 'react-router-dom';
import ActionButton from '@pages/participant/components/ActionButton';
import { currentRoundState } from '@states/host/roomSetState';
import useSlidingPanel from '@hooks/useSlidingPanel';
import * as S from './styles';

export default function PurchasePanel() {
  const navigate = useNavigate();
  const companyStock = useRecoilValue(selectedCompanyStockState); // 모달에 들어가는 값
  const round = useRecoilValue(currentRoundState); // 현재 라운드
  const { isSlidingOpen, closeSliding, setSlidingState } = useSlidingPanel();

  const handleClickBuyButton = () => {
    closeSliding();
    setSlidingState('buy');
    setTimeout(() => {
      navigate('/participant/purchase', { state: { permit: true } });
    }, 500);
  };

  return (
    <S.PurchasePanelContainer $visible={isSlidingOpen}>
      <span></span>
      <S.CompanyWrapper>
        <h2>{companyStock.companyName}</h2>
      </S.CompanyWrapper>
      <LineChart />
      <S.StockPriceContainer
        $color={
          companyStock.secondMenuPrice - companyStock.firstMenuPrice > 0 &&
          round !== 1
            ? 'red'
            : companyStock.secondMenuPrice - companyStock.firstMenuPrice ===
                0 || round == 1
            ? 'black'
            : 'blue'
        }
      >
        <div>
          <p>전 라운드 가격</p>
          <p>
            {round === 1
              ? '-'
              : companyStock.firstMenuPrice.toLocaleString('ko-KR')}
          </p>
        </div>
        <div>
          <p>현 라운드 가격</p>
          <p>{companyStock.secondMenuPrice.toLocaleString('ko-KR')}</p>
        </div>
      </S.StockPriceContainer>
      <S.NoticeWrapper
        $color={
          companyStock.difference > 0 && round !== 1
            ? 'red'
            : companyStock.difference === 0 || round === 1
            ? 'black'
            : 'blue'
        }
      >
        {round === 1
          ? '이전 라운드가 없습니다.'
          : companyStock.difference >= 0
          ? `전 라운드가 보다 ${companyStock.difference.toLocaleString(
              'ko-KR'
            )}원(${companyStock.percent}%)이 올랐어요`
          : `전 라운드가 보다 ${companyStock.difference.toLocaleString(
              'ko-KR'
            )}원(${companyStock.percent}%)이 내렸어요`}
      </S.NoticeWrapper>
      <S.ButtonWrapper>
        <ActionButton value="매수하기" onClick={handleClickBuyButton} />
      </S.ButtonWrapper>
    </S.PurchasePanelContainer>
  );
}
