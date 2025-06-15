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
