import Footer from '@components/Footer';
import Header from '@components/Header';
import * as S from './styles';

export default function About() {
  return (
    <S.AboutContainer>
      <Header />
      <S.BackgroundImage src="/images/mainBackgroundImage.svg" />
      <S.Main>
        <S.TeamWrapper>
          <img src="/images/evidLogo.svg" />
          <h3>뛰어들고 부딪히고 튀어오릅니다.</h3>
          <p>
            EVID는 새로운 경험을 추구하는 경험하는 크루입니다. <br />
            소수 정예로 뭉친 저희는 늘 새롭고 재미난 아이템을 탐하고 연구합니다.
            <br />
            때로는 성장을 위해, 성공을 위해, 경험을 위해 앞으로 EVID는 계속해서
            <br />
            새로움에 뛰어들고 튀어오를 것입니다.
          </p>
        </S.TeamWrapper>
        <S.IntroductionWrapper>
          <S.TeamIntroduction>
            <h3>팀 소개</h3>
            <p>
              팀 EVID는 클라이언트의 고유한 비전과 요구사항을 핵심으로 웹 개발을
              실현합니다. 저희는 프로젝트를 세심하게 계획하고 디자인하여,
              혁신적이고 독창적인 결과물을 창출합니다. 저희와 함께 협력하여 웹의
              가능성을 극대화하세요.
            </p>
          </S.TeamIntroduction>
          <S.Statistics>
            <h3>끊임 없는 도전의 시작</h3>
            <div>
              <S.ListWrapper>
                <div>
                  <label htmlFor="year">개설연도</label>
                  <p id="year">2023년</p>
                </div>
                <div>
                  <label htmlFor="users">사용자 수</label>
                  <p id="users">36명</p>
                </div>
              </S.ListWrapper>
              <S.ListWrapper>
                <div>
                  <label htmlFor="members">멤버 수</label>
                  <p id="members">5명</p>
                </div>
                <div>
                  <label htmlFor="services">서비스 수</label>
                  <p id="services">1개</p>
                </div>
              </S.ListWrapper>
            </div>
          </S.Statistics>
        </S.IntroductionWrapper>
      </S.Main>
      <img src="/images/evidBackgroundLogo.svg" />
      <Footer />
    </S.AboutContainer>
  );
}
