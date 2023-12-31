import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
const { persistAtom } = recoilPersist();

interface RoomSet {
  round_num: number | undefined;
  time_limit: number | undefined;
  seed: number | undefined;
}

// 게임방 세팅 관련 내용
export const roomSet = atom<RoomSet>({
  key: 'roomSet',
  default: {
    round_num: undefined,
    time_limit: undefined,
    seed: undefined,
  },
  effects_UNSTABLE: [persistAtom],
});

// 게임방 버튼 상태
export const currentBtnState = atom<string>({
  key: 'currentBtn',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

// 게임방 버튼 상태
export const systemVisible = atom<boolean>({
  key: 'systemVisible',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 게임방 패스워드
export const currentRoomCode = atom<string | undefined>({
  key: 'roomCode',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

// 게임 라운드
export const currentRound = atom<number>({
  key: 'round',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

interface ResultCondition {
  round: number | undefined;
  opt: number | undefined;
}

// 게임 결과 조회 조건
export const resultCondition = atom<ResultCondition>({
  key: 'resultCondition',
  default: {
    round: 1,
    opt: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
