import Timer from '../features/Timer';
import Wallet from './Wallet';
import News from './News';
import Stock from './Stock';
import Header from '../components/ParticipantHeader';
import * as S from './styles';
import StockSkeleton from './Stock/components/StockSkeleton';
import { DelayedSuspense } from '@components/DelayedSuspense';
import useDashboard from './useDashboard';

export default function DashboardPage() {
  const { gameModalVisible, currentRound, slidingState, selectedNav } =
    useDashboard();

  return (
    <S.DashboardContainer>
      <S.FinishModal $visible={gameModalVisible}>
        <div>
          <img src="/images/loading-image.png" />
          <p>{currentRound}라운드 종료</p>
        </div>
      </S.FinishModal>
      <Header navbar />
      <S.Main $state={slidingState}>
        <S.ContentSection>
          {selectedNav === 'wallet' && <Wallet />}
          {selectedNav === 'stock' && (
            <DelayedSuspense fallback={<StockSkeleton />} delay={0}>
              <Stock />
            </DelayedSuspense>
          )}
          {selectedNav === 'news' && (
            <DelayedSuspense fallback={<StockSkeleton />} delay={0}>
              <News />
            </DelayedSuspense>
          )}
        </S.ContentSection>
        <Timer />
      </S.Main>
    </S.DashboardContainer>
  );
}
