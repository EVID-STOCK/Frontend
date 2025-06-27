import { Timer } from 'types/room';
import * as S from './styles';
import { useRoundEnd } from './useRoundEnd';

export default function RoundEndModal({
  setTimer,
}: {
  setTimer: React.Dispatch<React.SetStateAction<Timer>>;
}) {
  const { handleGoToResult, goNextRound } = useRoundEnd(setTimer);

  return (
    <S.RoundEndModalContainer>
      <p>라운드 종료</p>
      <S.ActionButtonWrapper>
        <button onClick={handleGoToResult}>결과 조회</button>
        <button onClick={goNextRound}>다음 라운드</button>
      </S.ActionButtonWrapper>
    </S.RoundEndModalContainer>
  );
}
