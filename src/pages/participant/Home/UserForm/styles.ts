import styled, { css, keyframes } from 'styled-components';

const profile_slide = (state: boolean) => keyframes`
  from {
    transform: ${state ? 'translateY(25px)' : 'translateY(0px)'};
  }
  to {
    transform: ${state ? 'translateY(0px)' : 'translateY(25px)'};
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
const editIcon_slide = (state: boolean) => keyframes`
  from {
    transform: ${state ? 'translateY(40px)' : 'translateY(-20px)'};
  }

  to {
    transform: ${state ? 'translateY(0px)' : 'translateY(20px)'};
  }
`;

export const SecondPage = styled.div<{
  $state: boolean;
  $codeVisible: boolean;
}>`
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

export const SetMyInfo = styled.div<{
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

  & > div {
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
  }
`;

export const NameForm = styled.form<{
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

    & > input {
      width: 100%;
      display: block;
      border-radius: 100px;
      background: ${(props) =>
        props.$nameState ? 'rgba(255, 255, 255, 0.4)' : '#ffffff'};
      padding: 16px 44px;
      color: ${(props) =>
        props.$nameState ? '#ffffff' : 'rgba(0, 0, 0, 0.5)'};
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
    }

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

export const RoomCodeForm = styled.form<{
  $nameState: boolean;
  $codeState: boolean;
}>`
  display: flex;
  justify-content: center;
  width: 100%;

  & > input {
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
  }
  // submit 버튼
  & > button {
    display: none;
  }
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
