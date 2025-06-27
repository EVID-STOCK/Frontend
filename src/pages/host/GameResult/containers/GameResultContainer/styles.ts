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
