import { ExistStockList, Stock, User } from 'types/stock';
import { defaultInstance } from '../utils/instance';

interface UserInfoResponse {
  user_info: User;
  stock_list: ExistStockList;
}

// 유저 정보(유저 정보 + 유저 주식 정보) 가져오기
export const fetchUserInfo = async (
  roomCode: string
): Promise<UserInfoResponse> => {
  const response = await defaultInstance.get(`/users/${roomCode}`);
  return response.data;
};

type StockListResponse = Stock[];

// 종목 리스트 가져오기
export const getStockList = async (
  roomCode: string
): Promise<StockListResponse> => {
  const response = await defaultInstance.get(`/stocks?pwd=${roomCode}`);
  return response.data;
};

interface NewsListResponse {
  com_name: string[];
  descriptions: string[];
  isGood: boolean[];
}

// 뉴스 리스트 가져오기
export const getNewsList = async (
  roomCode: string
): Promise<NewsListResponse> => {
  const response = await defaultInstance.get(`/news?pwd=${roomCode}`);
  return response.data;
};

interface PurchaseStock {
  purchase_num: number;
  pwd: string;
}

interface PurchaseStockResponse {
  data: { executedPrice: number; message: string };
  status: number;
}

// 매수하기
export const postPurchaseStock = async (
  id: number,
  purchaseInfo: PurchaseStock
): Promise<PurchaseStockResponse> => {
  try {
    const { data, status } = await defaultInstance.post(
      `/stocks/${id}`,
      purchaseInfo
    );
    return { data, status };
  } catch (e: any) {
    throw new Error(e.response?.data?.error || '알 수 없는 오류');
  }
};

interface SellStock {
  sell_num: number;
  pwd: string;
}

// 매도하기
export const deleteSellStock = async (id: number, sellInfo: SellStock) => {
  try {
    const { data, status } = await defaultInstance.delete(`/stocks/${id}`, {
      data: sellInfo,
    });
    return { data, status };
  } catch (e: any) {
    throw new Error(e.response?.data?.error || '알 수 없는 오류');
  }
};
