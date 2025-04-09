import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { roomCodeState } from '@states/host/roomSetState';
import Header from '../components/ParticipantHeader';
import useSlidingPanel from '@hooks/useSlidingPanel';
import { useUser } from '@hooks/useUserQuery';
import Timer from '../components/Timer';
import { useSellStockQuery } from '@hooks/useSellStockQuery';
import Keypad from '../components/Keypad';
import * as S from './styles';
import ActionButton from '../components/ActionButton';
import { NoticeAlert } from '@utils/customAlert';
import { SellError } from 'errors/SellError';

function Sell() {
  const [sellStock, setSellStock] = useState<string>('');
  const [notice, setNotice] = useState<{
    available: boolean | null;
    content: string;
  }>({ available: true, content: '' });
  const { data: userData } = useUser();

  const roomCode = useRecoilValue(roomCodeState);
  const { setSlidingState } = useSlidingPanel();
  const companyStock = useRecoilValue(selectedCompanyStockState);
  const { mutate } = useSellStockQuery();

  const handleClickSellButton = useCallback(async () => {
    try {
      if (sellStock.length === 0) {
        throw new SellError('몇 주를 팔지 입력해주세요.', 'NO_STOCK_INPUT');
      }
      if (!notice.available) {
        throw new SellError('보유중인 주식이 부족합니다.', 'NO_STOCK');
      }
      if (!companyStock.id) {
        throw new SellError('오류가 발생했습니다.', 'NO_COMPANY');
      }
      if (!roomCode) {
        throw new SellError('존재하지 않는 방입니다.', 'NO_ROOM');
      }
      mutate({
        stockId: companyStock.id,
        sellInfo: {
          sell_num: Number(sellStock),
          pwd: roomCode,
        },
      });
    } catch (e) {
      if (e instanceof SellError) {
        NoticeAlert({ title: e.message, icon: 'info', position: 'center' });
      } else {
        console.error('알 수 없는 에러:', e);
      }
    }
  }, [notice, companyStock.id, roomCode]);

  useEffect(() => {
    if (!userData) return;
    if (sellStock.length === 0) {
      // 몇 주를 팔지 입력하지 않은 경우
      setNotice({
        available: null,
        content: `${
          companyStock.inStock === undefined ? 0 : companyStock.inStock
        }주 보유중`,
      });
    } else {
      const getAsset = Number(sellStock) * companyStock.secondMenuPrice; // 벌 수 있는 금액

      if (companyStock.inStock && Number(sellStock) <= companyStock.inStock) {
        // 내가 해당 개수만큼 주식을 보유하고 있는 경우
        setNotice({
          available: true,
          content: `${getAsset.toLocaleString('ko-KR')}원을 벌어요.`,
        });
      } else {
        // 내가 해당 개수보다 주식을 덜 보유했을 경우
        setNotice({
          available: false,
          content: `보유중인 주식이 부족해요.`,
        });
      }
    }
  }, [sellStock]);

  useEffect(() => {
    return () => {
      setSlidingState(null);
    };
  }, []);

  return (
    <S.SellContainer>
      <Header />
      <S.SellMainContainer>
        <S.PriceWrapper>
          <p>{companyStock.secondMenuPrice.toLocaleString('ko-KR')}</p>
          <p>현재 1주당 가격</p>
        </S.PriceWrapper>
        <S.SellStockWrapper $value={sellStock} $available={notice.available}>
          <p>
            {sellStock.length === 0 ? <span></span> : null}
            {sellStock.length === 0 ? '몇 주를 팔까요?' : sellStock + '주'}
          </p>
          <p>{notice.content}</p>
        </S.SellStockWrapper>
        <S.AvailableAssetsWrapper>
          <p>
            {userData &&
              (
                userData?.user_info?.using_asset +
                Number(sellStock) * companyStock.secondMenuPrice
              ).toLocaleString('ko-KR')}
            원
          </p>
          <p>가용자산</p>
        </S.AvailableAssetsWrapper>
        <Keypad setStock={setSellStock} />
        <S.ActionButtonWrapper>
          <ActionButton value="매도하기" onClick={handleClickSellButton} />
        </S.ActionButtonWrapper>
        <S.RoundWrapper>
          <Timer />
        </S.RoundWrapper>
      </S.SellMainContainer>
    </S.SellContainer>
  );
}

export default Sell;
