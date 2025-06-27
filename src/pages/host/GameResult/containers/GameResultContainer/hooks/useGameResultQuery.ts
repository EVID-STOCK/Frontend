import { useEffect, useState } from 'react';
import { fetchGameResult } from '@apis/api/game';
import { useLocation } from 'react-router-dom';
import { useGameResultCondition } from './useGameResultCondition';

interface GameResultList {
  rank: number;
  profile_num: number;
  name: string;
  total_price: number;
  total_roi: number;
}

export function useGameResultQuery() {
  const [results, setResults] = useState<GameResultList[]>([]);
  const { state } = useLocation();
  const { condition } = useGameResultCondition();

  useEffect(() => {
    const getGameResult = async () => {
      const res = await fetchGameResult(
        state.roomPW,
        condition.round,
        condition.opt
      );
      setResults(res.data.data);
    };

    getGameResult();
  }, [condition]);

  return { results };
}
