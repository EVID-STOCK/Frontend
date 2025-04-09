export interface Student {
  userId: number;
  userName: string;
  label?: number;
  room_id?: number;
  profileNum: number;
  isHost: number;
  session_id?: string;
}

export interface Timer {
  min: string | null;
  sec: string | null;
}

export interface RoomSet {
  round_num: number | null;
  time_limit: number | null;
  seed: number | null;
}

export type ModalState = 'password' | 'game' | 'gameover' | null;

export interface NotifyRoundProps {
  currentRound: number;
  totalRound: number;
}

export interface Participant {
  userId: number;
  userName: string;
  room_id: number;
  profileNum: 0 | 1 | 2;
  ishost: number;
}
