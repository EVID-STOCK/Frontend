import styled from 'styled-components';

export const NewsContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 360px;
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;

  & > h3 {
    color: #000000;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const NewsListWrapper = styled.ul`
  height: 100%;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
