import styled from 'styled-components';

export default function Splash() {
  return (
    <SplashContainer>
      <LogoWrapper>
        <img src="/images/mainLogo.svg" />
        <p>
          학생들도 주식에 쉽게 다가갈 수 있는
          <br /> 모의주식 서비스 E - STOCK 입니다.
        </p>
      </LogoWrapper>
      <Notice>좌우로 슬라이드하여 이동하세요</Notice>
    </SplashContainer>
  );
}

const SplashContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background: none;
  position: relative;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  & > img {
    max-width: 200px;
    min-width: 150px;
    width: 51%;
  }

  & > p {
    color: #ffffff;
    text-align: center;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Notice = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 60px;
  color: #ffffff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: 39px;
`;
