import { css, keyframes, styled } from 'styled-components';

export const DashboardContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  background-color: #ececec;
  overflow: hidden;
`;

export const rotatedImage = () => keyframes`
  100% {
    transform: rotate(-360deg);
  }
`;

export const FinishModal = styled.div<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  bottom: 0;
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  font-size: 1.5rem;
  z-index: 5;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 281px;
    height: 159px;
    background: #ffffff;
    border-radius: 24px;
    gap: 10px;

    & > img {
      width: 79.492px;
      height: 79.492px;
      animation: ${rotatedImage} 1s infinite linear;
    }

    & > p {
      color: #000000;
      font-size: 1.8rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
`;

export const content_slide = (state: string | null) => keyframes`
  from {
    transform: ${state !== null ? 'translateY(0px)' : 'translateY(300px)'};
    opacity: ${state !== null ? 1 : 0};
  }

  to {
    transform: ${state !== null ? 'translateY(300px)' : 'translateY(0px)'};
    opacity: ${state !== null ? 0 : 1};
  }
`;

export const Main = styled.main<{ $state: string | null }>`
  display: flex;
  flex-direction: column;
  height: calc(100% - 106px);
  padding: 16px 15px;
  background-color: #ececec;
  overflow: hidden;
  gap: 15px;

  animation: ${(props) =>
    props.$state === undefined
      ? ``
      : props.$state !== 'wallet' &&
        props.$state !== 'stock' &&
        props.$state !== 'news'
      ? css`
          ${content_slide(props.$state)} 0.5s ease-in
        `
      : null};
`;

export const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - (180px + 58px));
  min-height: 650px;
  gap: 15px;
`;
