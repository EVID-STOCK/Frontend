import { useUser } from '@hooks/queries/useUserQuery';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { useRecoilValue } from 'recoil';
import { Notice } from '../hooks/useSell';
import * as S from './styles';

export default function SellSummaryPanel({
  sellStock,
  notice,
}: {
  sellStock: string;
  notice: Notice;
}) {
  const { data: userData } = useUser();
  const companyStock = useRecoilValue(selectedCompanyStockState);

  return (
    <section>
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
              userData?.data.user_info?.using_asset +
              Number(sellStock) * companyStock.secondMenuPrice
            ).toLocaleString('ko-KR')}
          원
        </p>
        <p>가용자산</p>
      </S.AvailableAssetsWrapper>
    </section>
  );
}
