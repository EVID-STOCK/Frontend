export interface CreateGameRoomResponse {
  roomCode: string;
}
export interface UpdateRoomSettingsResponse {}

export interface Participant {
  isHost: boolean;
  profileNum: 0 | 1 | 2;
  userId: number;
  userName: string;
}

export interface ParticipantListResponse {
  participants: Participant[];
}
