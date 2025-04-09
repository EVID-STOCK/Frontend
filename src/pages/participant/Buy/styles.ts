import { css, keyframes, styled } from 'styled-components';

const up_slide = () => keyframes`
from {
  transform: translateY(100px);
  opacity: 0;
}

to {
  transform:translateY(0px);
  opacity: 1;
}
`;

const twinkle = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const shake = keyframes`
  0% {
    transform: translate3d(-2px, 0px, 0);
  }
  100% {
    transform: translate3d(2px, 0px, 0);
  }
`;

export const PurchaseContainer = styled.div`
  min-height: 100vh;
  background-color: #ececec;
`;

export const PurchaseMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* min-height: calc(100vh - 108px); */
  background-color: #ececec;
  animation: ${up_slide} 0.5s 0s forwards;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.6rem 2rem;
  gap: 0.8rem;

  & > p:first-child {
    left: 20px;
    color: #000000;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  & > p:last-child {
    color: #000000;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export const PurchaseStockWrapper = styled.div<{
  $value: string;
  $available: boolean | null;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 1.6rem 2rem;
  gap: 0.8rem;

  & > p:first-child {
    display: flex;
    align-items: center;
    color: ${(props) =>
      props.$value.length === 0 ? 'rgba(0, 0, 0, 0.5)' : '#000000'};
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    & > span {
      display: inline-block;
      width: 3px;
      height: 2rem;
      background-color: rgba(0, 0, 0, 0.403);
      animation: ${twinkle} 0.5s 0s alternate infinite;
    }
  }

  & > p:nth-child(2) {
    color: #000000;
    color: ${(props) =>
      props.$available === null
        ? '#000000'
        : props.$available
        ? '#0038FF'
        : '#ff0000'};
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    animation: ${(props) =>
      props.$available === false
        ? css`
            ${shake} 0.1s 0s 3
          `
        : ``};
  }
`;

export const AvailableAssetsWrapper = styled(PriceWrapper)`
  padding: 1.6rem 2rem 6.2rem 2rem;
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 6.7rem;
`;

export const RoundWrapper = styled.div`
  padding: 1.6rem 1.5rem;
`;
