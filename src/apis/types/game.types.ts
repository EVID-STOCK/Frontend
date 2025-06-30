export interface CreateGameRoomResponse {
  roomCode: string;
}
export interface UpdateRoomSettingsResponse {}

export interface FetchRoomSettingsResponse {
  roundNum: number;
  seed: number;
  timeLimit: number;
  curr_round: number;
  status: 'WAITING' | 'IN_PROGRESS' | 'LOADING' | 'FINISHED';
}

export interface DeleteGameRoomResponse {}

export interface StudentInfo {
  userName: string;
  profileNum: number;
}

export interface JoinGameRoomResponse {}

export interface LeaveGameRoomResponse {}

export interface Participant {
  isHost: boolean;
  profileNum: 0 | 1 | 2;
  userId: number;
  userName: string;
}

export interface ParticipantListResponse {
  participants: Participant[];
}
