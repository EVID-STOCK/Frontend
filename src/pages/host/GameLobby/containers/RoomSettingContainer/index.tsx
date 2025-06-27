import React from 'react';
import ListLayout from '@components/ListLayout';
import convertSecondsToMinute from '@utils/convertSecondsToMinute';
import Select from '@components/Select';
import * as S from './styles';
import { useSetRoom } from './useSetRoom';

function RoomSettingContainer() {
  const {
    roomSetting,
    handleRoundSelect,
    handleTimelimitSelect,
    handleSeedSelect,
  } = useSetRoom();

  const roundOptions = Array.from({ length: 6 }, (_, i) => i + 5);
  const timeLimitOptions = Array.from({ length: 20 }, (_, i) => 30 + 30 * i);
  const seedOptions = Array.from({ length: 19 }, (_, i) => 100 + 50 * i);

  const getTimelimitLabel = (timeLimit: number | null) => {
    if (!timeLimit) return '~분 ~초';
    const { min, sec } = convertSecondsToMinute(timeLimit);
    return `${min}:${sec}`;
  };

  const getSeedLabel = (seed: number | null) => {
    if (!seed) return '만원';
    return `${String(seed).slice(0, -4)}`;
  };

  return (
    <S.RoomSettingContainer>
      <ListLayout title="방 설정" src="/icons/room-icon.svg">
        <S.ListContainer>
          <S.SelectList>
            <Select
              title="라운드"
              options={roundOptions}
              handleOption={handleRoundSelect}
              value={roomSetting.roundNum?.toString() ?? '라운드'}
            />
            <Select
              title="제한시간"
              options={timeLimitOptions}
              handleOption={handleTimelimitSelect}
              value={getTimelimitLabel(roomSetting.timeLimit)}
              convert={(value: number | string) => {
                const { min, sec } = convertSecondsToMinute(value as number);
                return `${min}:${sec}`;
              }}
            />
            <Select
              title="시드머니"
              options={seedOptions}
              handleOption={handleSeedSelect}
              value={getSeedLabel(roomSetting.seed)}
            />
          </S.SelectList>
          <S.ListImage src="/images/room-setting-image.svg" />
        </S.ListContainer>
      </ListLayout>
    </S.RoomSettingContainer>
  );
}

export default React.memo(RoomSettingContainer);
