import Select from '@components/Select';
import * as S from './styles';
import { useRecoilValue } from 'recoil';
import { currentRoundState } from '@states/host/roomSetState';
import { useGameResultCondition } from './useGameResultCondition';

export default function ResultOptions() {
  const currentRound = useRecoilValue(currentRoundState);
  const {
    condition,
    roundSelectOptions,
    sortSelectOptions,
    handleRoundSelect,
    handleDivisionSelect,
  } = useGameResultCondition();

  return (
    <S.ResultOptionsWrapper>
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
    </S.ResultOptionsWrapper>
  );
}
