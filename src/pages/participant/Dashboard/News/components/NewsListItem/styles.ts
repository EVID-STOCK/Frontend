import styled from 'styled-components';

export const NewsListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 8px 18px;
  border-bottom: 1px solid #000000;
  color: #000000;
  gap: 8px;

  & > p:first-child {
    color: #000;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  & > p:last-child {
    color: #000;
    text-align: right;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
