import ActionButton from '@pages/participant/components/ActionButton';
import LineChart from '@pages/participant/Dashboard/components/StockChart';

import * as S from './styles';
import useTradeSlidingPanel from './useTradeSlidingPanel';

export default function TradingSlidingPanel({ panelRef }: any) {
  const {
    companyStock,
    getAveragePurchase,
    getCurrentRoundStockPrice,
    handleClickPurchaseButton,
    handleClickSellButton,
    getCurrentRoundStockPriceColor,
    getNoticeColor,
    isSlidingOpen,
    getNotice,
  } = useTradeSlidingPanel();

  return (
    <S.TradingSlidingPanelContainer $visible={isSlidingOpen} ref={panelRef}>
      <span></span>
      <div>
        <h2>{companyStock.companyName}</h2>
        <h2>{companyStock.inStock}주 보유</h2>
      </div>
      <LineChart />
      <S.StockPriceContainer $color={getCurrentRoundStockPriceColor}>
        <div>
          <p>평균 매입가</p>
          <p>{getAveragePurchase}</p>
        </div>
        <div>
          <p>현 라운드 가격</p>
          <p>{getCurrentRoundStockPrice}</p>
        </div>
      </S.StockPriceContainer>
      <S.NoticeWrapper $color={getNoticeColor}>
        {getNotice(companyStock.difference)}
      </S.NoticeWrapper>
      <S.ButtonWrapper>
        <ActionButton value="추가매수" onClick={handleClickPurchaseButton} />
        <ActionButton value="매도하기" onClick={handleClickSellButton} />
      </S.ButtonWrapper>
    </S.TradingSlidingPanelContainer>
  );
}
