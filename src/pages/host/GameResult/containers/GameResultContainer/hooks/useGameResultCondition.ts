import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentRoundState,
  gameResultConditionState,
} from '@states/host/roomSetState';
import { useEffect } from 'react';

export function useGameResultCondition() {
  const currentRound = useRecoilValue(currentRoundState);
  const [condition, setCondition] = useRecoilState(gameResultConditionState);
  const roundSelectOptions = Array.from(
    { length: currentRound },
    (_, index) => index + 1
  );
  const sortSelectOptions = ['자산별', '수익별'];

  const handleRoundSelect = (selected: string) => {
    setCondition((pre) => ({
      ...pre,
      round: Number(selected),
    }));
  };

  const handleDivisionSelect = (selected: string) => {
    const parsedSelected = selected === '자산별' ? 0 : 1;
    setCondition((pre) => ({
      ...pre,
      opt: parsedSelected,
    }));
  };

  useEffect(() => {
    const initialCondition = () => {
      setCondition({
        round: currentRound,
        opt: 0,
      });
    };
    initialCondition();
  }, [currentRound]);

  return {
    condition,
    roundSelectOptions,
    sortSelectOptions,
    handleRoundSelect,
    handleDivisionSelect,
  };
}
