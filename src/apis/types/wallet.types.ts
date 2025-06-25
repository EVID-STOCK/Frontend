import { ExistStockList, Stock, User } from 'types/stock';

export interface UserInfoResponse {
  user_info: User;
  stock_list: ExistStockList;
}

export interface NewsListResponse {
  com_name: string[];
  descriptions: string[];
  isGood: boolean[];
}

export interface PurchaseStock {
  purchase_num: number;
  pwd: string;
}

export interface PurchaseStockResponse {
  data: { executedPrice: number; message: string };
  status: number;
}

export interface SellStock {
  sell_num: number;
  pwd: string;
}
