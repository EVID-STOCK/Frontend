import { styled } from 'styled-components';

export const ContactContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
  position: relative;
  overflow: hidden;
`;

export const BackgroundImage = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 5.6rem;

  @media screen and (max-width: 768px) {
    align-items: center;
    width: 100%;
    padding: 0 10vw;
  }
`;

export const Logo = styled.img`
  width: 21.4rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Info = styled.ul`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  gap: 3.2rem;
  white-space: nowrap;
  padding: 6rem;
  border-radius: 2.4rem;
  background: rgba(255, 255, 255, 0.2);

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    white-space: normal;
    word-break: break-all;
  }
`;
