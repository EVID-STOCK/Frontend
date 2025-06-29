import { atom } from 'recoil';

export const roomCodeState = atom<{
  value: string;
  state: boolean;
}>({
  key: 'userFormRoomCodeState',
  default: {
    value: '',
    state: false,
  },
});

export const roomCodeCompareState = atom<{
  text: string;
  state: boolean | undefined;
}>({
  key: 'roomCodeCompareState',
  default: {
    text: '프로필을 눌러 설정해주세요',
    state: undefined,
  },
});
