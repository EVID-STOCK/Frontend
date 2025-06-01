import Footer from '@components/Footer';
import Header from '@components/Header';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <Header />
      <BackgroundImage src="/images/main-background-image.svg" />
      <Main>
        <Logo src="/images/main-logo.svg" />
        <p>
          학생들도 주식에 쉽게 다가갈 수 있는
          <br />
          모의주식 서비스 E - STOCK 입니다.
        </p>
        <CreateRoomButton onClick={() => navigate('/enter')}>
          시작하기
        </CreateRoomButton>
      </Main>
      <Footer />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
  position: relative;
  overflow: hidden;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 4rem;

  & > p {
    color: #ffffff;
    text-align: center;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  @media screen and (max-width: 768px) {
    gap: 5vh;
    align-items: center;

    & > p {
      font-size: 2vh;
      white-space: nowrap;
    }
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Logo = styled.img`
  align-self: center;
  width: 32rem;
  height: 23rem;

  @media screen and (max-width: 768px) {
    width: 25vh;
    height: auto;
    min-width: 17rem;
  }
`;

const CreateRoomButton = styled.button`
  display: flex;
  justify-content: center;
  height: 5.6rem;
  padding: 1.6rem 3.2rem;
  align-items: center;
  gap: 2rem;
  border-radius: 3.8rem;
  background-color: #ffffff;
  color: #000000;
  -moz-transition:
    background-color 0.5s,
    color 0.5s;
  -o-transition:
    background-color 0.5s,
    color 0.5s;
  -webkit-transition:
    background-color 0.5s,
    color 0.5s;
  transition:
    background-color 0.5s,
    color 0.5s;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: #a7c2e4;
  }

  &:hover > img {
    filter: brightness(600%);
  }

  & > img {
    transition: filter, 0.5s;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    max-width: 27.4rem;
    padding: 2rem 2rem;
    font-size: 2rem;
    white-space: nowrap;
  }
`;
