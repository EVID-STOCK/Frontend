import styled, { keyframes } from 'styled-components';

export const NameFormWrapper = styled.form<{
  $nameState: boolean;
}>`
  display: flex;
  justify-content: center;
  width: 100%;

  & > div {
    background: none;
    position: relative;
    width: 75%;
    max-width: 296px;

    // edit 아이콘
    & > img {
      position: absolute;
      top: 35%;
      right: 6vw;
      display: ${(props) => (props.$nameState ? 'block' : 'none')};
      animation: ${(props) => editIcon_slide(props.$nameState)} 1s 0s forwards;
    }
  }

  // submit 버튼
  & > button {
    display: none;
  }
`;

export const NameInput = styled.input<{
  $nameState: boolean;
}>`
  width: 100%;
  display: block;
  border-radius: 100px;
  background: ${(props) =>
    props.$nameState ? 'rgba(255, 255, 255, 0.4)' : '#ffffff'};
  padding: 16px 44px;
  color: ${(props) => (props.$nameState ? '#ffffff' : 'rgba(0, 0, 0, 0.5)')};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  animation: ${(props) => name_slide(props.$nameState)} 1s 0s forwards;

  ::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.4);
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

const name_slide = (state: boolean) => keyframes`
  from {
    transform: ${state ? 'translateY(40px)' : 'translateY(-20px)'};
    background: ${
      state ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0)'
    };
  }

  to {
    transform: ${state ? 'translateY(0px)' : 'translateY(20px)'};
    background: ${state ? 'rgba(255, 255, 255, 0)' : ''};
  }
`;

const editIcon_slide = (state: boolean) => keyframes`
  from {
    transform: ${state ? 'translateY(40px)' : 'translateY(-20px)'};
  }

  to {
    transform: ${state ? 'translateY(0px)' : 'translateY(20px)'};
  }
`;
