import React from 'react';
import useTimer from './useTimer';
import * as S from './styles';

function Timer() {
  const { round, timer, roomSetting } = useTimer();

  return (
    <S.TimerContainer>
      <p>
        {/* 1라운드 당시에는 roundNum에 아무 값도 들어있지 않음. */}
        {round} / {roomSetting.roundNum} 라운드
      </p>
      <p>
        {timer.min !== null && timer.sec !== null
          ? timer.min + ':' + timer.sec
          : '00:00'}
      </p>
    </S.TimerContainer>
  );
}

export default React.memo(Timer);
