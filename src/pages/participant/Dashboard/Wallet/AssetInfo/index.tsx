import { useUser } from '@hooks/queries/useUserQuery';
import * as S from './styles';

export default function AssetInfo() {
  const { data: userData } = useUser();

  const getProfitColor = () => {
    let color = '';
    const totalRoi = userData?.data.user_info?.total_roi || 0;

    if (totalRoi > 0) {
      color = 'red';
    } else if (totalRoi < 0) {
      color = 'blue';
    } else {
      color = 'black';
    }

    return color;
  };

  return (
    <S.AssetContainer>
      <S.AssetWrapper>
        <S.InformationWrapper>
          <p>총자산</p>
          <p>
            {userData?.data.user_info?.total_asset?.toLocaleString('ko-KR')}
          </p>
        </S.InformationWrapper>
        <S.InformationWrapper>
          <p>가용자산</p>
          <p>
            {userData?.data.user_info?.using_asset?.toLocaleString('ko-KR')}
          </p>
        </S.InformationWrapper>
      </S.AssetWrapper>

      <S.AssetWrapper>
        <S.InformationWrapper>
          <p>총평가손익</p>
          <S.TotalIncome $color={getProfitColor()}>
            {userData?.data.user_info?.total_roi.toFixed(2)}%
          </S.TotalIncome>
        </S.InformationWrapper>
        <S.InformationWrapper>
          <p>보유주식총액</p>
          <p>
            {userData?.data.user_info?.total_stock_holding?.toLocaleString(
              'ko-KR'
            )}
          </p>
        </S.InformationWrapper>
      </S.AssetWrapper>
    </S.AssetContainer>
  );
}
