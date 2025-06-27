import RankingRow from '../RankingRow';
import * as S from './styles';

interface GameResultList {
  rank: number;
  profile_num: number;
  name: string;
  total_price: number;
  total_roi: number;
}

export default function RankingTable({
  results,
}: {
  results: GameResultList[];
}) {
  return (
    <div>
      <S.RankingHeader>
        <p>학생 이름</p>
        <p>총 자산</p>
        <p>수익률</p>
      </S.RankingHeader>
      <S.RankingContent>
        <table>
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            {results &&
              results.map((result) => {
                return <RankingRow result={result} />;
              })}
          </tbody>
        </table>
      </S.RankingContent>
    </div>
  );
}
