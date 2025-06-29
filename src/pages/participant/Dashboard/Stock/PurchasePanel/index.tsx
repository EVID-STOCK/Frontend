import LineChart from '@pages/participant/Dashboard/components/StockChart';
import ActionButton from '@pages/participant/components/ActionButton';
import * as S from './styles';
import usePurchasePanel from './usePurchasePanel';

export default function PurchasePanel() {
  const {
    companyName,
    isSlidingOpen,
    handleClickPurchaseButton,
    getStockPriceColor,
    getNotice,
    getPreviousRoundStockPrice,
    getCurrentRoundStockPrice,
  } = usePurchasePanel();

  return (
    <S.PurchasePanelContainer $visible={isSlidingOpen}>
      <span></span>
      <S.CompanyWrapper>
        <h2>{companyName}</h2>
      </S.CompanyWrapper>
      <LineChart />
      <S.StockPriceContainer $color={getStockPriceColor()}>
        <div>
          <p>전 라운드 가격</p>
          <p>{getPreviousRoundStockPrice}</p>
        </div>
        <div>
          <p>현 라운드 가격</p>
          <p>{getCurrentRoundStockPrice}</p>
        </div>
      </S.StockPriceContainer>
      <S.NoticeWrapper $color={getStockPriceColor()}>
        {getNotice()}
      </S.NoticeWrapper>
      <S.ButtonWrapper>
        <ActionButton value="매수하기" onClick={handleClickPurchaseButton} />
      </S.ButtonWrapper>
    </S.PurchasePanelContainer>
  );
}
