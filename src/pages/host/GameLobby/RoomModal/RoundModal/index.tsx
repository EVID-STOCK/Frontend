import ProgressModal from './components/ProgressModal';
import RoundEndModal from './components/RoundEndModal';
import { useRoundEnd } from './hooks/useRoundEnd';
import { useManageRound } from './hooks/useManageRound';

export default function RoundModal() {
  const { modalState, timer, setTimer, round } = useManageRound();
  const { handleGoToResult, handleNextRound } = useRoundEnd(setTimer);

  return (
    <>
      {modalState('hostGameModal') === 'game' ? (
        <ProgressModal timer={timer} round={round} />
      ) : (
        <RoundEndModal
          onClickResultButton={handleGoToResult}
          onClickNextRoundButton={handleNextRound}
        />
      )}
    </>
  );
}
