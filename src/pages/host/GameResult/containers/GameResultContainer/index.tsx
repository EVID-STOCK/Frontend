import Header from '@components/Header';
import ListLayout from '@components/ListLayout';
import ActionButton from '@components/ActionButton';
import * as S from './styles';
import Select from '@components/Select';
import { useGameResult } from './hooks/useGameResult';
import RankingTable from '../../components/RankingTable';

const HEADERS = ['순위', '프로필', '이름', '총 자산', '수익률'];

export default function GameResultContainer() {
  const {
    currentRound,
    condition,
    roundSelectOptions,
    sortSelectOptions,
    results,
    goNextRound,
    handleRoundSelect,
    handleDivisionSelect,
  } = useGameResult();

  return (
    <S.GameResultContainer>
      <Header />
      <S.WaitingRoomList>
        <ListLayout title="결과 조회" src="/icons/result-icon.svg">
          <S.ListTitle>
            <h3>{currentRound}라운드 랭킹</h3>
            <div>
              <Select
                value={String(currentRound)}
                handleOption={handleRoundSelect}
                options={roundSelectOptions}
              />
              <Select
                value={condition.opt === 0 ? '자산별' : '수익별'}
                handleOption={handleDivisionSelect}
                options={sortSelectOptions}
              />
            </div>
          </S.ListTitle>
          <RankingTable results={results} />
        </ListLayout>
        <S.ActionButtonWrapper>
          <S.StyledCsvDownloadButton
            data={results}
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
      </S.WaitingRoomList>
    </S.GameResultContainer>
  );
}
