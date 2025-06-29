import styled, { keyframes } from 'styled-components';

const roomcode_slide = (state: boolean) => keyframes`
  from {
    transform: ${state ? 'translateY(40px)' : 'translateY(-10px)'};
    background: ${
      state ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 1)'
    };
    opacity: ${state ? '0' : '1'};
  }
  to {
    transform: ${state ? 'translateY(-10px)' : 'translateY(40px)'};
    opacity: ${state ? '1' : '0'};
    // profile selector가 올라왔을 때 roomcode input 있는 부분이 클릭 안되는 오류가 있어서 추가
    display: ${state ? '' : 'none'}; 
  }
`;

export const RoomCodeFormContainer = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;

  // submit 버튼
  & > button {
    display: none;
  }
`;

export const RoomCodeInput = styled.input<{
  $nameState: boolean;
  $codeState: boolean;
}>`
  width: 75%;
  max-width: 296px;
  display: block;
  position: absolute;
  bottom: 0px;
  border-radius: 100px;
  background: ${(props) =>
    !props.$codeState ? '#ffffff' : 'rgba(255, 255, 255, 0)'};
  padding: 16px 44px;
  color: ${(props) => (!props.$codeState ? 'rgba(0, 0, 0, 0.5)' : '#ffffff')};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  letter-spacing: ${(props) => (props.$codeState ? '7px' : '0px')};
  animation: ${(props) => roomcode_slide(props.$nameState)} 1s 0s forwards;

  ::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.4);
    color: #ffffff;
    -moz-transition: all, 1s;
    -o-transition: all, 1s;
    -webkit-transition: all, 1s;
    transition: all, 1s;

    &::placeholder {
      color: #ffffff;
    }
  }
`;
