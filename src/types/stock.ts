export interface User {
  profile_num: number;
  total_asset: number;
  total_roi: number;
  total_stock_holding: number;
  username: string;
  using_asset: number;
}

export interface ExistStock {
  id?: number;
  buy_average: number;
  com_name: string;
  count: number;
  current_price: number;
  difference_price: number;
  percent: number;
}
// 숫자 key를 갖는 객체 (예: { 6: StockItem })
export type ExistStockList = {
  [stockId: string]: ExistStock;
};

export interface Stock {
  companyName: string;
  currentPrice: number;
  difference: number;
  percent: number;
  previousPrice: number;
}
