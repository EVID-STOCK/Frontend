import styled from 'styled-components';

export const AboutContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
  position: relative;
  overflow: hidden;

  // Evid 로고 문양
  & > img:nth-child(4) {
    width: 130rem;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  @media screen and (max-width: 768px) {
    & > img:nth-child(4) {
      width: 70%;
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
`;

export const BackgroundImage = styled.img`
  width: 100%;
  position: absolute;
  top: 550px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  margin-top: 143px;
  margin-bottom: 525px;
  position: relative;
  padding: 0 66px;

  @media screen and (max-width: 768px) {
    padding: 0 40px;
    margin-top: 100px;
    margin-bottom: 200px;
  }
`;

export const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-bottom: 455px;
  width: 705px;

  & > img {
    width: 313.588px;
    margin-bottom: 96px;
  }

  & > h3 {
    color: #ffffff;
    text-align: center;
    font-size: 3.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 40px;
  }

  & > p {
    color: #ffffff;
    text-align: center;
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 100px;
    text-align: left;
    width: 100%;

    & > img {
      display: none;
    }

    & > h3 {
      font-size: 2rem;
      margin-bottom: 30px;
    }

    & > p {
      font-size: 1.6rem;
      max-width: 400px;

      & > br {
        display: none;
      }
    }
  }
`;

export const IntroductionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 90px;

  @media screen and (max-width: 1300px) {
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    gap: 50px;
    flex-direction: column;
  }
`;

export const TeamIntroduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 96px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.2);
  padding: 86.5px 60px;
  /* width: 100%; */
  width: 645px;

  & > h3:first-child {
    color: #ffffff;
    text-align: left;
    font-style: normal;
    line-height: normal;
    font-size: 3.2rem;
    font-weight: 700;
  }

  & > p:last-child {
    color: #ffffff;
    text-align: left;
    font-style: normal;
    line-height: normal;
    font-size: 2.4rem;
    font-weight: 500;
  }

  @media screen and (max-width: 1300px) {
    flex-direction: column;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    gap: 30px;
    align-items: center;
    padding: 46.5px 20px;

    & > h3:first-child {
      font-size: 2rem;
      text-align: center;
    }

    & > p:last-child {
      font-size: 1.6rem;
      max-width: 400px;
      width: 100%;
    }
  }
`;

export const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  line-height: normal;
  font-style: normal;
  gap: 96px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.2);
  padding: 60px;
  width: 100%;
  width: 408px;

  & > h3 {
    font-size: 3.2rem;
    font-weight: 700;
  }

  & > div {
    display: flex;
    flex-direction: column;
    width: 281px;
    flex-wrap: wrap;
    row-gap: 40px;
    column-gap: 72px;
  }
  @media screen and (max-width: 1300px) {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    gap: 30px;
    align-items: center;
    padding: 46.5px 20px;

    & > h3 {
      font-size: 2rem;
      text-align: center;
    }

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      max-width: 281px;
      row-gap: 20px;
      column-gap: 36px;
    }
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  & > div {
    & > label {
      font-size: 2.4rem;
      font-weight: 400;
    }
    & > p {
      font-size: 3.2rem;
      font-weight: 700;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
    & > div {
      & > label {
        font-size: 1.8rem;
        font-weight: 400;
      }
      & > p {
        font-size: 1.6rem;
        font-weight: 700;
      }
    }
  }
`;
