import styled from 'styled-components';

export const RoundEndModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  height: 320px;
  border-radius: 24px;
  background: #ffffff;
  overflow: hidden;

  & > p {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 242px;
    color: #000000;
    font-size: 4.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media screen and (max-width: 768px) {
    height: auto;
    width: 80%;

    & > p {
      height: unset;
      font-size: 6vw;
      padding: 50px 0;
    }
  }
`;

export const ActionButtonWrapper = styled.div`
  width: 100%;
  border-top: 2px solid #8c8c8c;
  height: 79px;
  background-color: #ffffff;

  & > button {
    background-color: #ffffff;
    height: 100%;
    width: 50%;
    color: #3f51b5;
    font-size: 3.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
    -moz-transition: all, 0.3s;
    -o-transition: all, 0.3s;
    -webkit-transition: all, 0.3s;
    transition: all, 0.3s;

    &:first-child {
      border-right: 2px solid #8c8c8c;
    }

    &:hover {
      background-color: #a7c2e4;
      color: #ffffff;
    }
  }

  @media screen and (max-width: 768px) {
    height: unset;

    & > button {
      font-size: 4vw;
      padding: 20px 0;
    }
  }
`;
