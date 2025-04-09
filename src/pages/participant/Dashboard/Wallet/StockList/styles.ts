import styled from 'styled-components';

export const StockListEmptyMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #ffffff;
  border-radius: 16px;

  & > p {
    text-align: center;
    color: #000000;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const StockListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 360px;
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;

  & > h3 {
    text-align: center;
    color: #000000;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const StockListWrapper = styled.ul`
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StockListItem = styled.li<{ $color: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #000000;
  padding: 8px 15px 8px 21px;
  border-bottom: 1px solid #000000;
  cursor: pointer;

  &:hover {
    background: #e1e1e1;
  }

  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 3px;

    & > p:first-child {
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    & > p:last-child {
      font-size: 1.2rem;
      font-weight: 400;
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
