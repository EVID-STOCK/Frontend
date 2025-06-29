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
