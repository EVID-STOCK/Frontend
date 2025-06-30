import ActionButton from '@components/ActionButton';
import * as S from './styles';
import { useNextRound } from './useNextRound';
import { useGetGameResultsQuery } from '../hooks/useGetGameResultsQuery';

const HEADERS = ['순위', '프로필', '이름', '총 자산', '수익률'];

export default function RoundActionButtons() {
  const { data: gameResultsData } = useGetGameResultsQuery();
  const { goNextRound } = useNextRound();

  return (
    <S.ActionButtonWrapper>
      <S.StyledCsvDownloadButton
        data={gameResultsData?.data || []}
        filename="게임 결과.csv"
        delimiter=","
        headers={HEADERS}
      >
        결과 저장하기
      </S.StyledCsvDownloadButton>
      <ActionButton
        value="다음 라운드"
        borderRadius={25}
        fontSize={2}
        onClick={goNextRound}
        padding={1.2}
      />
    </S.ActionButtonWrapper>
  );
}
