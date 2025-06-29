import styled, { keyframes } from 'styled-components';

export const profile_slide = (state: boolean) => keyframes`
  from {
    transform: ${state ? 'translateY(25px)' : 'translateY(0px)'};
  }
  to {
    transform: ${state ? 'translateY(0px)' : 'translateY(25px)'};
  }
`;

export const UserProfileWrapper = styled.section<{
  $nameState: boolean;
}>`
  position: relative;
  animation: ${(props) => profile_slide(props.$nameState)} 1s 0s forwards;

  & > img:nth-child(1) {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    cursor: pointer;
  }

  & > img:nth-child(2) {
    position: absolute;
    bottom: 0;
    right: 5px;
    cursor: pointer;
  }
`;
