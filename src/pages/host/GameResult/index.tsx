import Header from '@components/Header';
import ListLayout from '@components/ListLayout';
import * as S from './styles';
import RoundActionButtons from './RoundActionButtons';
import ResultOptions from './ResultOptions';
import { useGameResultQuery } from './hooks/useGameResultQuery';
import RankingTable from './components/RankingTable';

export default function GameResultPage() {
  const { results } = useGameResultQuery();

  return (
    <S.GameResultContainer>
      <Header />
      <S.WaitingRoomList>
        <ListLayout title="결과 조회" src="/icons/result-icon.svg">
          <ResultOptions />
          <RankingTable results={results} />
        </ListLayout>
        <RoundActionButtons />
      </S.WaitingRoomList>
    </S.GameResultContainer>
  );
}
