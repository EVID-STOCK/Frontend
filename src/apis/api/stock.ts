import { ApiResponse } from '@apis/types/api.types';
import { StockGraphPoint } from '@apis/types/stock.types';
import { defaultInstance } from '@apis/utils/instance';

// 특정 회사에 해당하는 주식 그래프 가져오기
export const fetchStockGraph = async (
  roomPW: string,
  companyId: number
): Promise<ApiResponse<StockGraphPoint[]>> => {
  const response = await defaultInstance.get(`/stocks/${companyId}/graph`, {
    params: {
      pwd: roomPW,
    },
  });
  return response.data;
};
