import { styled } from 'styled-components';

export const GameLobbyContainer = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
  position: relative;
  padding-bottom: 8rem;

  @media screen and (max-width: 768px) {
    padding-bottom: 4rem;
  }
`;

export const GameLobbyMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 128rem;
  margin: 3rem auto 0 auto;
  padding: 0 2.5rem;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;

    & > p {
      letter-spacing: 20px;
      text-indent: 20px;
      font-size: 5vw;
    }
  }
`;

export const Password = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 720px;
  height: 240px;
  border-radius: 24px;
  background: #ffffff;

  & > p {
    color: #000000;
    font-size: 6.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 51.2px; // 마지막 글자에도 간격 처리 됨.
    text-indent: 51.2px; // 따라서 들여쓰기 기능 추가
  }

  @media screen and (max-width: 768px) {
    width: 80%;
    height: auto;
    max-width: 400px;
    padding: 30px 0;

    & > p {
      letter-spacing: 20px;
      text-indent: 20px;
      font-size: 5vw;
    }
  }
`;
