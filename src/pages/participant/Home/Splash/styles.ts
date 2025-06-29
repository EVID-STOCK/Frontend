import styled from 'styled-components';

export const SplashContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background: none;
  position: relative;
`;

export const LogoWrapper = styled.div`
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

export const Notice = styled.p`
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
