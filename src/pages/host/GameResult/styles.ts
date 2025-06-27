import styled from 'styled-components';

export const GameResultContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
`;

export const WaitingRoomList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 600px;
  margin: 3rem auto 0 auto;
  padding: 0 25px;
  gap: 2rem;
  padding-bottom: 8rem;

  & > div:nth-child(1) {
    height: unset;
    min-height: 500px;
  }

  @media screen and (max-width: 768px) {
    & > div:nth-child(1) {
      padding-top: 50px;
    }
  }
`;
