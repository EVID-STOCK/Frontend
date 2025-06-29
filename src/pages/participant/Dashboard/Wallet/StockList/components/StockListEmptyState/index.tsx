import styled from 'styled-components';

export default function StockListEmptyState() {
  return (
    <StockListEmptyStateContainer>
      <p>
        뉴스를 분석하고 주가가 오를것 같은
        <br />
        기업의 주식을 구매하세요!
      </p>
    </StockListEmptyStateContainer>
  );
}

const StockListEmptyStateContainer = styled.div`
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
