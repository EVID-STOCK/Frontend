import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { roomCodeState } from '@states/host/roomSetState';
import useSlidingPanel from '@hooks/useSlidingPanel';
import { useSellStockQuery } from '@pages/participant/Sell/hooks/useSellStockQuery';
import { NoticeAlert } from '@utils/customAlert';
import { SellError } from '@pages/participant/Sell/errors/SellError';

export interface Notice {
  available: boolean | null;
  content: string;
}

export default function useSell() {
  const roomCode = useRecoilValue(roomCodeState);
  const companyStock = useRecoilValue(selectedCompanyStockState);
  const [sellStock, setSellStock] = useState<string>('');
  const [notice, setNotice] = useState<Notice>({
    available: true,
    content: '',
  });
  const { setSlidingState, closeSliding } = useSlidingPanel();
  const { mutate: sellStockMutate } = useSellStockQuery();

  const handleClickSellButton = useCallback(async () => {
    try {
      if (sellStock.length === 0) throw new SellError('NO_STOCK_INPUT');
      if (!notice.available) throw new SellError('NO_STOCK');
      if (!companyStock.id) throw new SellError('NO_COMPANY');
      if (!roomCode) throw new SellError('NO_ROOM');

      sellStockMutate({
        stockId: companyStock.id,
        sellInfo: {
          sell_num: Number(sellStock),
          pwd: roomCode,
        },
      });
    } catch (err) {
      if (err instanceof SellError) {
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
        companyStock.inStock === undefined ? 0 : companyStock.inStock
      }주 보유중`,
    });
  };

  const noticeAvailabilitySellStock = () => {
    const getAsset = Number(sellStock) * companyStock.secondMenuPrice;
    const usingStock = companyStock.inStock;

    const availableSell = () => {
      setNotice({
        available: true,
        content: `${getAsset.toLocaleString('ko-KR')}원을 벌어요.`,
      });
    };

    const unavailableSell = () => {
      setNotice({
        available: false,
        content: `보유중인 주식이 부족해요.`,
      });
    };

    if (usingStock && Number(sellStock) <= usingStock) {
      availableSell();
    } else {
      unavailableSell();
    }
  };

  useEffect(() => {
    if (sellStock.length === 0) {
      noticeHaveStock();
    } else {
      noticeAvailabilitySellStock();
    }
  }, [sellStock]);

  useEffect(() => {
    return () => {
      setSlidingState(null);
    };
  }, []);

  return {
    sellStock,
    setSellStock,
    handleClickSellButton,
    notice,
  };
}
