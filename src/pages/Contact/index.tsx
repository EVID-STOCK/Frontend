import Header from '@components/Header';
import Footer from '@components/Footer';
import * as S from './styles';

function Contact() {
  return (
    <S.ContactContainer>
      <Header />
      <S.BackgroundImage src="/images/main-background-image.svg" />
      <S.Main>
        <S.Logo src="/images/evid-letter-logo.svg" />
        <S.Info>
          <li>대표 : 황을선</li>
          <li>연락처 : +82)10-4665-0917</li>
          <li>이메일 : dmftjs915@naver.com</li>
          <li>소재지 : (05005) 서울특별시 광진구 광나루로 17길 14-16</li>
        </S.Info>
      </S.Main>
      <Footer />
    </S.ContactContainer>
  );
}

export default Contact;
