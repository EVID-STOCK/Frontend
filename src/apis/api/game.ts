import { RoomSet } from 'types/room';
import { defaultInstance } from '../utils/instance';
import { ApiResponse } from '@apis/types/api.types';
import {
  CreateGameRoomResponse,
  DeleteGameRoomResponse,
  FetchGameResultsResponse,
  FetchRoomSettingsResponse,
  JoinGameRoomResponse,
  LeaveGameRoomResponse,
  ParticipantListResponse,
  SaveGameResultsResponse,
  StudentInfo,
  UpdateNextRoundResponse,
  UpdateRoomSettingsResponse,
} from '@apis/types/game.types';

export const createGameRoom = async (): Promise<
  ApiResponse<CreateGameRoomResponse>
> => {
  const response = await defaultInstance.post(`/rooms`);
  return response.data;
};

export const updateRoomSettings = async (
  roomPW: string,
  roomInfo: RoomSet
): Promise<ApiResponse<UpdateRoomSettingsResponse>> => {
  const response = await defaultInstance.put(`/rooms/${roomPW}`, roomInfo);
  return response.data;
};

export const fetchRoomSettings = async (
  roomPW: string
): Promise<ApiResponse<FetchRoomSettingsResponse>> => {
  const response = await defaultInstance.get(`/rooms/${roomPW}/setting`);
  return response.data;
};

export const fetchParticipants = async (
  roomPW: string
): Promise<ApiResponse<ParticipantListResponse>> => {
  const response = await defaultInstance.get(`/rooms/${roomPW}/participants`);
  return response.data;
};

export const deleteGameRoom = async (
  roomPW: string
): Promise<ApiResponse<DeleteGameRoomResponse>> => {
  const response = await defaultInstance.delete(`/rooms/${roomPW}`);
  return response.data;
};

export const joinGameRoom = async (
  roomPW: string,
  studentInfo: StudentInfo
): Promise<ApiResponse<JoinGameRoomResponse>> => {
  const response = await defaultInstance.post(`/users/${roomPW}`, studentInfo);
  return response.data;
};

export const leaveGameRoom = async (
  roomPW: string
): Promise<ApiResponse<LeaveGameRoomResponse>> => {
  const response = await defaultInstance.delete(`/users/${roomPW}`);
  return response.data;
};

export const updateNextRound = async (
  roomPW: string
): Promise<ApiResponse<UpdateNextRoundResponse>> => {
  const response = await defaultInstance.put(`/games/${roomPW}/next`);
  return response.data;
};

export const fetchGameResults = async (
  roomPW: string,
  round: number,
  opt: number
): Promise<ApiResponse<FetchGameResultsResponse>> => {
  const response = await defaultInstance.get(`/games/${roomPW}/result`, {
    params: { round, opt },
  });
  return response.data;
};

export const saveGameResults = async (
  roomPW: string,
  round: { round_num: number }
): Promise<ApiResponse<SaveGameResultsResponse>> => {
  const response = await defaultInstance.post(`/games/${roomPW}/result`, round);
  return response.data;
};
