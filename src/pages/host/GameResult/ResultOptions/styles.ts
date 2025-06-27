import styled from 'styled-components';

export const ResultOptionsWrapper = styled.div`
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
