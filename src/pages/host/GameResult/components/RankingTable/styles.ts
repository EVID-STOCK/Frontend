import styled from 'styled-components';

export const RankingHeader = styled.div`
  display: flex;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  color: #000000;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  overflow: hidden;
  padding: 1rem 50px;
  margin-top: 18px;
  margin-bottom: 9px;

  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > p:nth-child(1) {
    width: 50%;
  }

  & > p:nth-child(2) {
    width: 30%;
  }

  & > p:nth-child(3) {
    width: 20%;
    justify-content: flex-end;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 30px;
    font-size: 3vw;
    white-space: nowrap;
  }
`;

export const RankingContent = styled.div`
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.4);
  height: 100%;
  padding: 0 50px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  & > table {
    width: 100%;

    & > colgroup {
      & > col:nth-child(1) {
        width: 50%;
      }
      & > col:nth-child(2) {
        width: 30%;
      }
      & > col:nth-child(3) {
        width: 20%;
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0 30px;
  }
`;
