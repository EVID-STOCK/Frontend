import { useMutation, useQueryClient } from 'react-query';
import { deleteSellStock } from '@apis/api/wallet';
import { defaultAlert, networkErrorAlert } from '@utils/customAlert';
import { useNavigate } from 'react-router-dom';

export const useSellStockQuery = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    ({
      stockId,
      sellInfo,
    }: {
      stockId: number;
      sellInfo: { sell_num: number; pwd: string };
    }) => deleteSellStock(stockId, sellInfo),
    {
      onSuccess: (data) => {
        const executedPrice = data.data.executedPrice; // 체결된 가격
        defaultAlert(
          `체결된 가격: ${executedPrice.toLocaleString('ko-KR')}`,
          `주식 판매가 완료되었습니다.`
        );
        queryClient.invalidateQueries(['stockList']); // 주식 목록 갱신
        navigate(-1);
      },
      onError: (error: any) => {
        networkErrorAlert('❌ 주식 판매에 실패했습니다');
        console.error('주식 판매 에러:', error);
      },
    }
  );
};
