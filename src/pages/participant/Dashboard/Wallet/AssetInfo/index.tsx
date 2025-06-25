import { useUser } from '@hooks/useUserQuery';
import * as S from './styles';

export default function AssetInfo() {
  const { data } = useUser();

  return (
    <S.AssetContainer>
      <S.AssetWrapper>
        <S.InformationWrapper>
          <p>총자산</p>
          <p>{data?.data.user_info?.total_asset?.toLocaleString('ko-KR')}</p>
        </S.InformationWrapper>
        <S.InformationWrapper>
          <p>가용자산</p>
          <p>{data?.data.user_info?.using_asset?.toLocaleString('ko-KR')}</p>
        </S.InformationWrapper>
      </S.AssetWrapper>

      <S.AssetWrapper>
        <S.InformationWrapper>
          <p>총평가손익</p>
          <S.TotalIncome
            $color={
              data?.data.user_info?.total_roi &&
              data?.data.user_info?.total_roi > 0
                ? 'red'
                : data?.data.user_info?.total_roi === 0
                ? 'black'
                : 'blue'
            }
          >
            {data?.data.user_info?.total_roi.toFixed(2)}%
          </S.TotalIncome>
        </S.InformationWrapper>
        <S.InformationWrapper>
          <p>보유주식총액</p>
          <p>
            {data?.data.user_info?.total_stock_holding?.toLocaleString('ko-KR')}
          </p>
        </S.InformationWrapper>
      </S.AssetWrapper>
    </S.AssetContainer>
  );
}
