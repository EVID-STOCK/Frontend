import React from 'react';
import ListLayout from '@components/ListLayout';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { roomSetState } from '@states/host/roomSetState';
import convertSecondsToMinute from '@utils/convertSecondsToMinute';
import Select from '@components/Select';
Select;

function RoomSetting() {
  const [roomSetting, setRoomSetting] = useRecoilState(roomSetState);

  const handleRoundSelect = (selected: string) => {
    setRoomSetting((pre) => ({
      ...pre,
      round_num: Number(selected),
    }));
  };
  const handleTimelimitSelect = (selected: string) => {
    setRoomSetting((pre) => ({
      ...pre,
      time_limit: Number(selected),
    }));
  };
  const handleSeedSelect = (selected: string) => {
    setRoomSetting((pre) => ({
      ...pre,
      seed: Number(selected) * 10000,
    }));
  };

  return (
    <RoomSettingContainer>
      <ListLayout title="방 설정" src="/icons/room_icon.svg">
        <ListContainer>
          <SelectList>
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
          </SelectList>
          <ListImage src="/images/roomsettingImage.svg" />
        </ListContainer>
      </ListLayout>
    </RoomSettingContainer>
  );
}

export default React.memo(RoomSetting);

const ListContainer = styled.div`
  height: calc(100vh - 88px);
  min-height: 800px;
  max-height: 1000px;

  @media screen and (max-width: 768px) {
    height: auto;
    min-height: unset;
    max-height: unset;
  }
`;

const RoomSettingContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.9rem;
  position: absolute;
  left: 3.7rem;
  top: 6.5rem;
  z-index: 1;

  @media screen and (max-width: 768px) {
    position: static;
  }
`;

const ListImage = styled.img`
  align-self: center;
  position: absolute;
  bottom: 9.1rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
