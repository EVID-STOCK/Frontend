import styled from 'styled-components';

export const KeyPadContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 611px);
  min-height: 269px;
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 3);
    height: 100%;
    min-height: 67.25px;
    color: #000000;
    text-align: center;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: none;
    cursor: pointer;
  }
`;
