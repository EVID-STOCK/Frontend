import { useRecoilValue } from 'recoil';
import { useGameResultQuery } from './useGameResultQuery';
import { useNextRound } from './useNextRound';
import { currentRoundState } from '@states/host/roomSetState';
import { useGameResultCondition } from './useGameResultCondition';

export function useGameResult() {
  const currentRound = useRecoilValue(currentRoundState);
  const {
    condition,
    roundSelectOptions,
    sortSelectOptions,
    handleRoundSelect,
    handleDivisionSelect,
  } = useGameResultCondition();
  const { goNextRound } = useNextRound();
  const { results } = useGameResultQuery();

  return {
    currentRound,
    condition,
    roundSelectOptions,
    sortSelectOptions,
    results,
    goNextRound,
    handleRoundSelect,
    handleDivisionSelect,
  };
}
