import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
import { atom } from 'recoil';
import { Participant } from 'types/room';

export const userNameState = atom<string>({
  key: 'userNameState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const roomPasswordState = atom<string>({
  key: 'roomPasswordState',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const participantsState = atom<Participant[]>({
  key: 'participantsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
