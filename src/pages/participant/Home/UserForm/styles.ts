import styled, { css, keyframes } from 'styled-components';

export const UserFormContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
  background: none;
  gap: 40px;
  position: relative;
`;

export const SetUserInfo = styled.div<{
  $nameState: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 240px;
  background: none;
  gap: ${(props) => (props.$nameState ? '16px' : '36px')};
  position: relative;
`;

export const shake = keyframes`
  0% {
    transform: translate3d(-2px, 0px, 0);
  }
  100% {
    transform: translate3d(2px, 0px, 0);
  }
`;

export const Notice = styled.p<{ $state: boolean | undefined }>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  bottom: 60px;
  height: 39px;
  width: 100%;
  background-color: ${(props) =>
    props.$state === false ? 'rgba(255, 0, 0, 0.3)' : 'none'};
  animation: ${(props) =>
    props.$state === false
      ? css`
          ${shake} 0.1s 0s 3
        `
      : ``};
`;
