import styled from 'styled-components';

export const StockListItem = styled.li<{ $color: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 15px 8px 21px;
  border-bottom: 1px solid #000000;
  color: #000000;
  cursor: pointer;

  &:hover {
    background: #e1e1e1;
  }

  & > div:first-child {
    display: flex;
    align-items: center;
    gap: 3px;

    & > p {
      color: #000000;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }

  & > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;

    & > p:first-child {
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    & > p:last-child {
      font-size: 1.2rem;
      color: ${(props) => props.$color};
      font-weight: 400;
    }
  }
`;
