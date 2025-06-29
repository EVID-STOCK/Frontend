import { atom } from 'recoil';

export const selectedProfileState = atom<0 | 1 | 2>({
  key: 'selectedProfileState',
  default: 0,
});

export const profileSelectorVisibleState = atom<boolean>({
  key: 'profileSelectorVisibleState',
  default: true,
});
