import { recoilPersist } from 'recoil-persist';
import { atom } from 'recoil';
import { RoomSet } from 'types/room';
const { persistAtom } = recoilPersist();

// 게임방 세팅 관련 내용
export const roomSetState = atom<RoomSet>({
  key: 'roomSetState',
  default: {
    roundNum: null,
    timeLimit: null,
    seed: null,
  },
  effects_UNSTABLE: [persistAtom],
});

// 게임방 패스워드
export const roomCodeState = atom<string | null>({
  key: 'roomCodeState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

// 게임 라운드
export const currentRoundState = atom<number>({
  key: 'currentRoundState',
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

interface ResultCondition {
  round: number;
  opt: number;
}

// 게임 결과 조회 조건
export const gameResultConditionState = atom<ResultCondition>({
  key: 'gameResultConditionState',
  default: {
    round: 1,
    opt: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
