export interface StockGraphPoint {
  stockPrice: number;
}

export interface StockGraphResponse {
  data: StockGraphPoint[];
  message: string;
  success: boolean;
}
