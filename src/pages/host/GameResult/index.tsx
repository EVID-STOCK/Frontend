import Header from '@components/Header';
import ListLayout from '@components/ListLayout';
import * as S from './styles';
import RoundActionButtons from './RoundActionButtons';
import ResultOptions from './ResultOptions';
import RankingTable from './components/RankingTable';
import { useGetGameResultsQuery } from './hooks/useGetGameResultsQuery';

export default function GameResultPage() {
  const { data: gameResultsData } = useGetGameResultsQuery();

  return (
    <S.GameResultContainer>
      <Header />
      <S.WaitingRoomList>
        <ListLayout title="결과 조회" src="/icons/result-icon.svg">
          <ResultOptions />
          <RankingTable results={gameResultsData?.data || []} />
        </ListLayout>
        <RoundActionButtons />
      </S.WaitingRoomList>
    </S.GameResultContainer>
  );
}
