import Header from '../components/ParticipantHeader';
import Timer from '../features/Timer';
import Keypad from '../components/Keypad';
import ActionButton from '../components/ActionButton';
import SellSummaryPanel from './SellSummaryPanel';
import useSell from './useSell';
import * as S from './styles';

export default function SellPage() {
  const { sellStock, setSellStock, handleClickSellButton, notice } = useSell();

  return (
    <S.SellContainer>
      <Header />
      <S.SellMainContainer>
        <SellSummaryPanel sellStock={sellStock} notice={notice} />
        <Keypad setStock={setSellStock} />
        <S.ActionButtonWrapper>
          <ActionButton value="매도하기" onClick={handleClickSellButton} />
        </S.ActionButtonWrapper>
        <S.RoundWrapper>
          <Timer />
        </S.RoundWrapper>
      </S.SellMainContainer>
    </S.SellContainer>
  );
}
