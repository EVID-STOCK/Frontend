import { css, keyframes, styled } from 'styled-components';

const left_slide = () => keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
`;

const left_slide2 = () => keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const navbarOpacity = (state: string | undefined | null) => keyframes`
  from {
    opacity: ${state !== null ? '1' : '0'};
  }

  to {
    opacity: ${state !== null ? '0' : '1'};
  }
`;

const navbarWidth = (state: string | undefined | null) => keyframes`
from {
  width: ${state !== null ? '' : '80%'};
}

to {
  width: ${state !== null ? '80%' : ''};
}
`;

export const HeaderContainer = styled.header`
  width: 100%;
  background: linear-gradient(
    108deg,
    #3f51b5 4.42%,
    #00bcd4 99.95%,
    #03a9f4 99.95%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

export const HeaderWrapper = styled.div`
  margin-top: 4.2rem;
  padding: 2.5rem 0;
`;

export const Navbar = styled.nav<{
  $state: string | undefined | null;
  $selected: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  animation: ${(props) =>
    props.$state === undefined
      ? ``
      : props.$state !== 'wallet' &&
        props.$state !== 'stock' &&
        props.$state !== 'news'
      ? css`
          ${navbarOpacity(props.$state)} 0.6s 0s linear
        `
      : ``};
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 3);
    background: none;
    color: #ffffff;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    padding: 9px 0px;
    white-space: nowrap;
    cursor: pointer;

    &:nth-child(1) {
      border-radius: 0 8px 0 0;
      background: ${(props) =>
        props.$selected === 'wallet' ? 'rgba(255, 255, 255, 0.3)' : 'none'};
      animation: ${(props) =>
        props.$state === undefined
          ? ``
          : props.$selected === 'wallet' &&
            props.$state !== 'wallet' &&
            props.$state !== 'stock'
          ? css`
              ${navbarWidth(props.$state)} 0.6s 0s linear
            `
          : ``};
    }

    &:nth-child(2) {
      border-radius: 8px 8px 0 0;
      background: ${(props) =>
        props.$selected === 'stock' ? 'rgba(255, 255, 255, 0.3)' : 'none'};
      animation: ${(props) =>
        props.$state === undefined
          ? ``
          : props.$selected === 'stock' &&
            props.$state !== 'wallet' &&
            props.$state !== 'stock'
          ? css`
              ${navbarWidth(props.$state)} 0.6s 0s linear
            `
          : ``};
    }

    &:nth-child(3) {
      border-radius: 8px 0 0 0;
      background: ${(props) =>
        props.$selected === 'news' ? 'rgba(255, 255, 255, 0.3)' : 'none'};
    }

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const GoBackWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.9rem 0;
  position: relative;

  & > img {
    position: absolute;
    left: 7px;
    animation: ${left_slide2} 0.5s 0s forwards;
    cursor: pointer;
  }

  & > p {
    color: #ffffff;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    animation: ${left_slide} 0.5s 0s forwards;
  }
`;
