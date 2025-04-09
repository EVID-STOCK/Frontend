import styled from 'styled-components';
import CsvDownloadButton from 'react-json-to-csv';

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

export const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h3 {
    color: #ffffff;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  & > div {
    display: flex;
    gap: 24.66px;
  }

  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;

    & > h3 {
      font-size: 1.5rem;
    }

    & > div {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
`;

export const ResultHeader = styled.div`
  display: flex;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  /* height: 42px; */
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

export const ResultContent = styled.div`
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.4);
  /* height: 520px; */
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

    & > tbody {
      & > tr {
        & > td:nth-child(1) {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          color: #000000;
          font-size: 2rem;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          gap: 20px;
          padding: 10px 0;
          white-space: nowrap;
        }

        & > td:nth-child(2) {
          color: #000000;
          text-align: center;
          font-size: 1.5rem;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          padding: 0 10px;
        }

        & > td:nth-child(3) {
          text-align: right;
          font-size: 2rem;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0 30px;

    & > table {
      & > tbody {
        & > tr {
          & > td:nth-child(1) {
            font-size: 3vw;
            gap: 15px;
          }

          & > td:nth-child(2) {
            font-size: 2vw;
          }

          & > td:nth-child(3) {
            font-size: 3vw;
          }
        }
      }
    }
  }
`;

export const Profile = styled.img`
  width: 34.5px;
  height: 34.5px;
  border-radius: 100px;

  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }

  @media screen and (max-width: 390px) {
    display: none;
  }
`;

export const Roi = styled.td<{ color: string }>`
  color: ${(props) => props.color};
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  gap: 3rem;
`;

export const StyledCsvDownloadButton = styled(CsvDownloadButton)`
  width: 100%;
  padding: 1.2rem;
  border-radius: 25px;
  font-size: 2rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.4);
  color: #ffffff;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    background: #a7c2e4;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.7rem;
  }
`;
