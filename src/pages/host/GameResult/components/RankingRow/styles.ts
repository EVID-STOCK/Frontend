import styled from 'styled-components';

export const RankingRowContainer = styled.tr`
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

  @media screen and (max-width: 768px) {
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
