/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomSet } from 'types/room';
import { defaultInstance } from '../utils/instance';
import { ApiResponse } from '@apis/types/api.types';
import { ParticipantListResponse } from '@apis/types/stock.types';

// 게임방 비밀번호 가져오기
export const getGameRoomPassword = async () => {
  try {
    const { data, status } = await defaultInstance.post(`/rooms`);
    return { ...data, status };
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

// 게임방 정보 업데이트하기
export const updateRoomInfo = async (roomPW: string, roomInfo: RoomSet) => {
  try {
    const { data, status } = await defaultInstance.put(
      `/rooms/${roomPW}`,
      roomInfo
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

// 게임방 정보 가져오기
export const fetchRoomInfo = async (roomPW: string) => {
  try {
    const { data, status } = await defaultInstance.get(
      `/rooms/${roomPW}/setting`
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

// 참여자 리스트 가져오기
export const fetchParticipantList = async (
  roomPW: string
): Promise<ApiResponse<ParticipantListResponse>> => {
  const response = await defaultInstance.get(`/rooms/${roomPW}/participants`);
  return response.data;
};

// 게임방 제거하기
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

// 학생들 정보 생성 후 게임방에 참여시키기
export const participateGameRoom = async (
  roomPW: string,
  studentInfo: StudentInfo
) => {
  try {
    const { data, status } = await defaultInstance.post(
      `/users/${roomPW}`,
      studentInfo
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

// 게임방 나가기
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

// 게임방 다음 라운드로 넘어가기
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

// 게임 결과 조회하기
export const checkGameResult = async (
  roomPW: string,
  round: number,
  opt: number
) => {
  try {
    const { data, status } = await defaultInstance.get(
      `/games/${roomPW}/result?round=${round}&opt=${opt}`
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

// 게임 결과 저장하기
export const postGameResult = async (
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
