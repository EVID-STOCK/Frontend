import styled from 'styled-components';

export const AssetContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 16px 0px 16px 24px;
  gap: 21px;
`;

export const AssetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

export const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 80px;
  color: #000000;

  & > p {
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
  }

  & > p:first-child {
    font-size: 1.2rem;
    font-weight: 600;
  }

  & > p:last-child {
    font-size: 1.6rem;
  }
`;

export const TotalIncome = styled.p<{ $color: string }>`
  color: ${(props) => props.$color};
`;
