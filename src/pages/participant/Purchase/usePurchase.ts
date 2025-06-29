import { PurchaseError } from '@errors/PurchaseError';
import { usePurchaseStockQuery } from '@hooks/usePurchaseStockQuery';
import useSlidingPanel from '@hooks/useSlidingPanel';
import { useUser } from '@hooks/useUserQuery';
import { roomCodeState } from '@states/host/roomSetState';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { NoticeAlert } from '@utils/customAlert';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export interface Notice {
  available: boolean | null;
  content: string;
}

export default function usePurchase() {
  const { data: userData } = useUser();
  const roomCode = useRecoilValue(roomCodeState);
  const companyStock = useRecoilValue(selectedCompanyStockState);
  const [purchaseStock, setPurchaseStock] = useState<string>('');
  const [notice, setNotice] = useState<Notice>({
    available: null,
    content: '',
  });
  const { setSlidingState, closeSliding } = useSlidingPanel();
  const { mutate: purchaseStockMutate } = usePurchaseStockQuery();

  const handleClickPurchaseButton = useCallback(async () => {
    try {
      if (purchaseStock.length === 0) throw new PurchaseError('NO_STOCK_INPUT');
      if (!notice.available) throw new PurchaseError('NO_ASSET');
      if (!companyStock.id) throw new PurchaseError('NO_COMPANY');
      if (!roomCode) throw new PurchaseError('NO_ROOM');

      purchaseStockMutate({
        stockId: companyStock.id,
        purchaseInfo: {
          purchase_num: Number(purchaseStock),
          pwd: roomCode,
        },
      });
    } catch (err) {
      if (err instanceof PurchaseError) {
        NoticeAlert({ title: err.message, icon: 'info', position: 'center' });
      } else {
        console.error('알 수 없는 에러:', err);
      }
    }
  }, [notice, companyStock.id, roomCode]);

  const noticeHaveStock = () => {
    setNotice({
      available: null,
      content: `${
        userData?.data.stock_list[companyStock.id as number] === undefined
          ? 0
          : userData?.data.stock_list[companyStock.id as number]?.count
      }주 보유중`,
    });
  };

  const noticeAvailabilityPurchaseStock = () => {
    const useAsset = Number(purchaseStock) * companyStock.secondMenuPrice;
    const usingAsset = userData?.data?.user_info?.using_asset;

    if (usingAsset === undefined || usingAsset === null) return;

    const availablePurchase = () => {
      setNotice({
        available: true,
        content: `${useAsset.toLocaleString('ko-KR')}원을 사용할게요.`,
      });
    };

    const unavailablePurchase = () => {
      setNotice({
        available: false,
        content: `잔액이 부족합니다.`,
      });
    };

    if (usingAsset >= useAsset) {
      availablePurchase();
    } else {
      unavailablePurchase();
    }
  };

  // 주식 구매 가능 여부 판단
  useEffect(() => {
    if (purchaseStock.length === 0) {
      noticeHaveStock();
    } else {
      noticeAvailabilityPurchaseStock();
    }
  }, [purchaseStock]);

  useEffect(() => {
    return () => {
      setSlidingState(null);
    };
  }, []);

  return {
    purchaseStock,
    setPurchaseStock,
    handleClickPurchaseButton,
    notice,
  };
}
