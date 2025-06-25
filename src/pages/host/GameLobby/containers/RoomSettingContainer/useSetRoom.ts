import { roomSetState } from '@states/host/roomSetState';
import { useRecoilState } from 'recoil';

export const useSetRoom = () => {
  const [roomSetting, setRoomSetting] = useRecoilState(roomSetState);

  const handleRoundSelect = (selected: string) => {
    setRoomSetting((pre) => ({
      ...pre,
      roundNum: Number(selected),
    }));
  };
  const handleTimelimitSelect = (selected: string) => {
    setRoomSetting((pre) => ({
      ...pre,
      timeLimit: Number(selected),
    }));
  };
  const handleSeedSelect = (selected: string) => {
    setRoomSetting((pre) => ({
      ...pre,
      seed: Number(selected) * 10000,
    }));
  };

  return {
    roomSetting,
    handleRoundSelect,
    handleTimelimitSelect,
    handleSeedSelect,
  };
};
