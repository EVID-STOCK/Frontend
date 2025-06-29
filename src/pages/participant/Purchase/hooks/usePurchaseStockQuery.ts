import { useMutation, useQueryClient } from 'react-query';
import { purchaseStock } from '@apis/api/wallet';
import { defaultAlert, networkErrorAlert } from '@utils/customAlert';
import { useNavigate } from 'react-router-dom';

export const usePurchaseStockQuery = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    ({
      stockId,
      purchaseInfo,
    }: {
      stockId: number;
      purchaseInfo: { purchase_num: number; pwd: string };
    }) => purchaseStock(stockId, purchaseInfo),
    {
      onSuccess: (data) => {
        const executedPrice = data.data.executedPrice; // 체결된 가격
        defaultAlert(
          `체결된 가격: ${executedPrice.toLocaleString('ko-KR')}`,
          `주식 구매가 완료되었습니다.`
        );
        queryClient.invalidateQueries(['stockList']); // 주식 목록 갱신
        navigate(-1);
      },
      onError: (error: any) => {
        networkErrorAlert('❌ 주식 구매에 실패했습니다');
        console.error('주식 구매 에러:', error);
      },
    }
  );
};
