import * as S from './styles';

export default function Splash() {
  return (
    <S.SplashContainer>
      <S.LogoWrapper>
        <img src="/images/main-logo.svg" />
        <p>
          학생들도 주식에 쉽게 다가갈 수 있는
          <br /> 모의주식 서비스 E - STOCK 입니다.
        </p>
      </S.LogoWrapper>
      <S.Notice>좌우로 슬라이드하여 이동하세요</S.Notice>
    </S.SplashContainer>
  );
}
