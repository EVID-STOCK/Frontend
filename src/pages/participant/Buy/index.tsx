import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { roomCodeState } from '@states/host/roomSetState';
import Timer from '../components/Timer';
import Header from '../components/ParticipantHeader';
import Keypad from '../components/Keypad';
import { useUser } from '@hooks/useUserQuery';
import ActionButton from '../components/ActionButton';
import { PurchaseError } from 'errors/PurchaseError';
import * as S from './styles';
import { usePurchaseStockQuery } from '@hooks/usePurchaseStockQuery';
import useSlidingPanel from '@hooks/useSlidingPanel';
import { NoticeAlert } from '@utils/customAlert';

function Purchase() {
  const [purchaseStock, setPurchaseStock] = useState<string>('');
  const [notice, setNotice] = useState<{
    available: boolean | null;
    content: string;
  }>({ available: null, content: '' });
  const { data: userData } = useUser();

  const roomCode = useRecoilValue(roomCodeState);
  const { setSlidingState } = useSlidingPanel();
  const companyStock = useRecoilValue(selectedCompanyStockState);
  const { mutate } = usePurchaseStockQuery();

  const handleClickPurchaseButton = useCallback(async () => {
    try {
      if (purchaseStock.length === 0) throw new PurchaseError('NO_STOCK_INPUT');
      if (!notice.available) throw new PurchaseError('NO_ASSET');
      if (!companyStock.id) throw new PurchaseError('NO_COMPANY');
      if (!roomCode) throw new PurchaseError('NO_ROOM');

      mutate({
        stockId: companyStock.id,
        purchaseInfo: {
          purchase_num: Number(purchaseStock),
          pwd: roomCode,
        },
      });
    } catch (e) {
      if (e instanceof PurchaseError) {
        NoticeAlert({ title: e.message, icon: 'info', position: 'center' });
      } else {
        console.error('알 수 없는 에러:', e);
      }
    }
  }, [notice, companyStock.id, roomCode]);

  // 주식 구매 가능 여부 판단
  useEffect(() => {
    if (!userData) return;
    if (purchaseStock.length === 0) {
      // 몇 주를 살지 입력하지 않은 경우
      setNotice({
        available: null,
        content: `${
          userData?.stock_list[companyStock.id as number] === undefined
            ? 0
            : userData?.stock_list[companyStock.id as number]?.count
        }주 보유중`,
      });
    } else {
      // 몇 주를 살지 입력한 경우 -> 남은 가용자산 계산
      const useAsset = Number(purchaseStock) * companyStock.secondMenuPrice; // 사용할 금액

      if (userData?.user_info?.using_asset >= useAsset) {
        // 가용자산이 충분한 경우
        setNotice({
          available: true,
          content: `${useAsset.toLocaleString('ko-KR')}원을 사용할게요.`,
        });
      } else {
        // 가용자산이 사용할 금액보다 적을 경우
        setNotice({
          available: false,
          content: `잔액이 부족합니다.`,
        });
      }
    }
  }, [purchaseStock]);

  useEffect(() => {
    return () => {
      setSlidingState(null);
    };
  }, []);

  return (
    <S.PurchaseContainer>
      <Header />
      <S.PurchaseMainContainer>
        <S.PriceWrapper>
          <p>{companyStock.secondMenuPrice.toLocaleString('ko-KR')}</p>
          <p>현재 1주당 가격</p>
        </S.PriceWrapper>
        <S.PurchaseStockWrapper
          $value={purchaseStock}
          $available={notice.available}
        >
          <p>
            {purchaseStock.length === 0 ? <span></span> : null}
            {purchaseStock.length === 0
              ? '몇 주를 살까요?'
              : purchaseStock + '주'}
          </p>
          <p>{notice.content}</p>
        </S.PurchaseStockWrapper>
        <S.AvailableAssetsWrapper>
          <p>
            {userData &&
              (
                userData?.user_info?.using_asset -
                Number(purchaseStock) * companyStock.secondMenuPrice
              ).toLocaleString('ko-KR')}
            원
          </p>
          <p>가용자산</p>
        </S.AvailableAssetsWrapper>
        <Keypad setStock={setPurchaseStock} />
        <S.ActionButtonWrapper>
          <ActionButton value="매수하기" onClick={handleClickPurchaseButton} />
        </S.ActionButtonWrapper>
        <S.RoundWrapper>
          <Timer />
        </S.RoundWrapper>
      </S.PurchaseMainContainer>
    </S.PurchaseContainer>
  );
}

export default Purchase;
