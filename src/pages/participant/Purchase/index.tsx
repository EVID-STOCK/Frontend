import Timer from '../components/Timer';
import Header from '../components/ParticipantHeader';
import Keypad from '../components/Keypad';
import ActionButton from '../components/ActionButton';
import PurchaseSummaryPanel from './PurchaseSummaryPanel';
import usePurchase from './hooks/usePurchase';
import * as S from './styles';

export default function PurchasePage() {
  const { purchaseStock, setPurchaseStock, handleClickPurchaseButton, notice } =
    usePurchase();

  return (
    <S.PurchaseContainer>
      <Header />
      <S.PurchaseMainContainer>
        <PurchaseSummaryPanel purchaseStock={purchaseStock} notice={notice} />
        <Keypad setStock={setPurchaseStock} />
        <S.ActionButtonWrapper>
          <ActionButton value="매수하기" onClick={handleClickPurchaseButton} />
        </S.ActionButtonWrapper>
        <S.RoundWrapper>
          <Timer />
        </S.RoundWrapper>
      </S.PurchaseMainContainer>
    </S.PurchaseContainer>
  );
}
