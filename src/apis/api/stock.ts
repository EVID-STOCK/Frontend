import { ApiResponse } from '@apis/types/api.types';
import { StockGraphPoint } from '@apis/types/stock.types';
import { defaultInstance } from '@apis/utils/instance';

// 특정 회사에 해당하는 주식 그래프 가져오기
export const fetchStockGraph = async (
  roomPW: string,
  companyId: number
): Promise<ApiResponse<StockGraphPoint[]>> => {
  try {
    const response = await defaultInstance.get(`/stocks/${companyId}/graph`, {
      params: {
        pwd: roomPW,
      },
    });
    return response.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message || '알 수 없는 오류 발생');
    } else {
      throw new Error('서버에 연결할 수 없습니다.');
    }
  }
};
