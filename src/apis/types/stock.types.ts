export interface ParticipantListResponse {
  participants: {
    isHost: boolean;
    profileNum: number;
    userId: number;
    userName: string;
  }[];
}
