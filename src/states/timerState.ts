import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
const { persistAtom } = recoilPersist();

export const timerState = atom<{
  min: string | null;
  sec: string | null;
}>({
  key: 'timerState',
  default: { min: null, sec: null },
  effects_UNSTABLE: [persistAtom],
});
