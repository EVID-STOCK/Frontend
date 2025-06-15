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

  return (
    <S.RoomSettingContainer>
      <ListLayout title="방 설정" src="/icons/room-icon.svg">
        <S.ListContainer>
          <S.SelectList>
            <Select
              title="라운드"
              options={new Array(6).fill(0).map((_, index) => index + 5)}
              handleOption={handleRoundSelect}
              value={
                roomSetting.round_num ? String(roomSetting.round_num) : '라운드'
              }
            />
            <Select
              title="제한시간"
              options={new Array(20).fill(0).map((_, index) => 30 + 30 * index)}
              handleOption={handleTimelimitSelect}
              value={
                roomSetting.time_limit
                  ? String(
                      convertSecondsToMinute(roomSetting.time_limit).min +
                        ':' +
                        convertSecondsToMinute(roomSetting.time_limit).sec
                    )
                  : '~분 ~초'
              }
              convert={(value: number | string) => {
                const { min, sec } = convertSecondsToMinute(value as number);
                return `${min}:${sec}`;
              }}
            />
            <Select
              title="시드머니"
              options={new Array(19)
                .fill(0)
                .map((_, index) => 100 + 50 * index)}
              handleOption={handleSeedSelect}
              value={
                roomSetting.seed
                  ? String(roomSetting.seed).substring(
                      0,
                      String(roomSetting.seed).length - 4
                    )
                  : '만원'
              }
            />
          </S.SelectList>
          <S.ListImage src="/images/room-setting-image.svg" />
        </S.ListContainer>
      </ListLayout>
    </S.RoomSettingContainer>
  );
}

export default React.memo(RoomSettingContainer);
