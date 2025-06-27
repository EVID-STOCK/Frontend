import Footer from '@components/Footer';
import Header from '@components/Header';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';

export default function Home() {
  const navigate = useNavigate();
  return (
    <S.HomeContainer>
      <Header />
      <S.BackgroundImage src="/images/main-background-image.svg" />
      <S.Main>
        <S.Logo src="/images/main-logo.svg" />
        <p>
          학생들도 주식에 쉽게 다가갈 수 있는
          <br />
          모의주식 서비스 E - STOCK 입니다.
        </p>
        <S.CreateRoomButton onClick={() => navigate('/enter')}>
          시작하기
        </S.CreateRoomButton>
      </S.Main>
      <Footer />
    </S.HomeContainer>
  );
}
