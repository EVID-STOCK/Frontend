import { useRecoilValue } from 'recoil';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { useUser } from '@hooks/queries/useUserQuery';
import { Notice } from '@pages/participant/Purchase/hooks/usePurchase';
import * as S from './styles';

export default function PurchaseSummaryPanel({
  purchaseStock,
  notice,
}: {
  purchaseStock: string;
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
              userData?.data.user_info?.using_asset -
              Number(purchaseStock) * companyStock.secondMenuPrice
            ).toLocaleString('ko-KR')}
          원
        </p>
        <p>가용자산</p>
      </S.AvailableAssetsWrapper>
    </section>
  );
}
