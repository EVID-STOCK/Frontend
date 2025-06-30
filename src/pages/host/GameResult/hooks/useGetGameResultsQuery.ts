import { fetchGameResults } from '@apis/api/game';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { useGameResultCondition } from '../ResultOptions/useGameResultCondition';

export const useGetGameResultsQuery = () => {
  const { state } = useLocation();
  const { condition } = useGameResultCondition();

  return useQuery(
    ['gameResults'],
    () => fetchGameResults(state.roomPW!, condition.round, condition.opt),
    {
      enabled: !!state.roomPW,
      refetchOnWindowFocus: false,
    }
  );
};
