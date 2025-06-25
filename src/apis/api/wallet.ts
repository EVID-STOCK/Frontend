import {
  UserInfoResponse,
  NewsListResponse,
  PurchaseStock,
  PurchaseStockResponse,
  SellStock,
} from '../types/wallet.types';
import { defaultInstance } from '../utils/instance';
import { ApiResponse } from '../types/api.types';
import { Stock } from 'types/stock';

// 유저 정보(유저 정보 + 유저 주식 정보) 가져오기
export const fetchUserInfo = async (
  roomCode: string
): Promise<ApiResponse<UserInfoResponse>> => {
  const response = await defaultInstance.get(`/users/${roomCode}`);
  return response.data;
};

// 종목 리스트 가져오기
export const getStockList = async (
  roomCode: string
): Promise<ApiResponse<Stock[]>> => {
  const response = await defaultInstance.get(`/stocks?pwd=${roomCode}`);
  return response.data;
};

// 뉴스 리스트 가져오기
export const getNewsList = async (
  roomCode: string
): Promise<ApiResponse<NewsListResponse>> => {
  const response = await defaultInstance.get(`/news?pwd=${roomCode}`);
  return response.data;
};

// 매수하기
export const postPurchaseStock = async (
  id: number,
  purchaseInfo: PurchaseStock
): Promise<PurchaseStockResponse> => {
  try {
    const response = await defaultInstance.post(`/stocks/${id}`, purchaseInfo);
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.error || '알 수 없는 오류');
  }
};

// 매도하기
export const deleteSellStock = async (id: number, sellInfo: SellStock) => {
  try {
    const response = await defaultInstance.delete(`/stocks/${id}`, {
      data: sellInfo,
    });
    return response.data;
  } catch (e: any) {
    throw new Error(e.response?.data?.error || '알 수 없는 오류');
  }
};
