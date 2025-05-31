import styled from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 60rem;
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
  position: relative;
  overflow: hidden;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 4rem;

  & > p {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media screen and (max-width: 768px) {
    gap: 5vh;
    align-items: center;

    & > p {
      font-size: 2vh;
      white-space: nowrap;
    }
  }
`;

export const BackgroundImage = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Logo = styled.img`
  align-self: center;
  width: 32rem;
  height: 23rem;

  @media screen and (max-width: 768px) {
    width: 25vh;
    height: auto;
    min-width: 17rem;
  }
`;
