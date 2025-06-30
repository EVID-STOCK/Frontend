/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomSet } from 'types/room';
import { defaultInstance } from '../utils/instance';
import { ApiResponse } from '@apis/types/api.types';
import {
  CreateGameRoomResponse,
  FetchRoomSettingsResponse,
  ParticipantListResponse,
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

export const deleteGameRoom = async (roomPW: string) => {
  try {
    const { data, status } = await defaultInstance.delete(`/rooms/${roomPW}`);
    return { data, status };
  } catch (e: any) {
    if (e.response) {
      return e.response.data;
    } else {
      return {
        status: null,
        message: '서버에 연결할 수 없습니다.',
      };
    }
  }
};

interface StudentInfo {
  userName: string; // 이름
  profileNum: number; // 프로필
}

export const joinGameRoom = async (
  roomPW: string,
  studentInfo: StudentInfo
) => {
  try {
    const response = await defaultInstance.post(
      `/users/${roomPW}`,
      studentInfo
    );
    return response;
  } catch (e: any) {
    if (e.response) {
      return e.response;
    } else {
      return {
        status: null,
        message: '서버에 연결할 수 없습니다.',
      };
    }
  }
};

export const leaveGameRoom = async (roomPW: string) => {
  try {
    const { data, status } = await defaultInstance.delete(`/users/${roomPW}`);
    return { data, status };
  } catch (e: any) {
    if (e.response) {
      return e.response.data;
    } else {
      return {
        status: null,
        message: '서버에 연결할 수 없습니다.',
      };
    }
  }
};

export const updateNextRound = async (roomPW: string) => {
  try {
    const { data, status } = await defaultInstance.put(`/games/${roomPW}/next`);
    return { data, status };
  } catch (e: any) {
    if (e.response) {
      return e.response.data;
    } else {
      return {
        status: null,
        message: '서버에 연결할 수 없습니다.',
      };
    }
  }
};

export const fetchGameResults = async (
  roomPW: string,
  round: number,
  opt: number
) => {
  try {
    const { data, status } = await defaultInstance.get(
      `/games/${roomPW}/result`,
      {
        params: { round, opt },
      }
    );
    return { data, status };
  } catch (e: any) {
    if (e.response) {
      return e.response.data;
    } else {
      return {
        status: null,
        message: '서버에 연결할 수 없습니다.',
      };
    }
  }
};

export const saveGameResults = async (
  roomPW: string,
  round: { round_num: number }
) => {
  try {
    const { data, status } = await defaultInstance.post(
      `/games/${roomPW}/result`,
      round
    );
    return { data, status };
  } catch (e: any) {
    if (e.response) {
      return e.response.data;
    } else {
      return {
        status: null,
        message: '서버에 연결할 수 없습니다.',
      };
    }
  }
};
