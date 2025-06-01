import { currentRoundState } from '@states/host/roomSetState';
import { useRecoilValue } from 'recoil';
import { Timer } from 'types/room';
import * as S from './styles';

export default function ProgressModal({ timer }: { timer: Timer }) {
  const round = useRecoilValue(currentRoundState); // 현재 라운드

  return (
    <S.ProgressModalConatiner>
      <img src="/images/loading-image.png" />
      <div>
        <p>{round}라운드</p>
        <p>
          {timer.min !== null && timer.sec !== null
            ? timer.min + ':' + timer.sec
            : '00:00'}
        </p>
      </div>
    </S.ProgressModalConatiner>
  );
}
