import * as S from './styles';

interface GameResultList {
  rank: number;
  profile_num: number;
  name: string;
  total_price: number;
  total_roi: number;
}

const PROFILE_SRC: Record<number, string> = {
  0: '/images/profile-blue-1.png',
  1: '/images/profile-blue-2.png',
  2: '/images/profile-blue-3.png',
};

export default function RankingRow({ result }: { result: GameResultList }) {
  return (
    <S.RankingRowContainer key={result.rank}>
      <td>
        <S.Profile src={PROFILE_SRC[result.profile_num]} />
        <p>{result.name}</p>
      </td>
      <td>{result.total_price.toLocaleString('ko-KR')}</td>
      <S.Roi
        color={
          result.total_roi > 0
            ? 'red'
            : result.total_roi === 0
            ? 'black'
            : 'blue'
        }
      >
        {result.total_roi}%
      </S.Roi>
    </S.RankingRowContainer>
  );
}
