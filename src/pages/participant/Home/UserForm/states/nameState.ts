import { atom } from 'recoil';

export const nameState = atom<{
  value: string;
  state: boolean;
}>({
  key: 'nameState',
  default: {
    value: '',
    state: false,
  },
});
