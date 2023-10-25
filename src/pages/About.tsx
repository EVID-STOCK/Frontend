import React from 'react';
import { styled } from 'styled-components';
import Header_ from '@components/common/header';
import Footer from '@components/common/footer';

function About() {
  return (
    <AboutLayout>
      <Header_ />
      <BackgroundImage src="/images/mainBackgroundImage.svg" />
      <Main>
        <TeamBox>
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
        </TeamBox>
        <IntroductionBox>
          <TeamIntroduction>
            <h3>팀 소개</h3>
            <p>
              팀 EVID는 클라이언트의 고유한 비전과 요구사항을 <br />
              핵심으로 웹 개발을 실현합니다. 저희는 프로젝트를 <br />
              세심하게 계획하고 디자인하여, 혁신적이고 독창적인 <br />
              결과물을 창출합니다. 저희와 함께 협력하여 웹의 가<br />
              능성을 극대화하세요.
            </p>
          </TeamIntroduction>
          <Statistics>
            <h3>끊임 없는 도전의 시작</h3>
            <div>
              <div>
                <label htmlFor="year">개설연도</label>
                <p id="year">2023년</p>
              </div>
              <div>
                <label htmlFor="users">사용자 수</label>
                <p id="users">36명</p>
              </div>
              <div>
                <label htmlFor="members">멤버 수</label>
                <p id="members">5명</p>
              </div>
              <div>
                <label htmlFor="services">서비스 수</label>
                <p id="services">1개</p>
              </div>
            </div>
          </Statistics>
        </IntroductionBox>
      </Main>
      <img src="/images/evidBackgroundLogo.svg" />
      <Footer />
    </AboutLayout>
  );
}

const AboutLayout = styled.div`
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 100vh;
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
  position: relative;
  overflow: hidden;

  // Evid 로고 문양
  & > img:nth-child(4) {
    width: 130rem;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  position: absolute;
  top: 550px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 143px;
  margin-bottom: 525px;
  position: relative;
`;

const TeamBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 455px;

  & > img {
    width: 313.588px;
    height: 326.001px;
    margin-bottom: 96px;
  }

  & > h3 {
    color: #ffffff;
    text-align: center;
    font-size: 3.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 40px;
  }

  & > p {
    color: #ffffff;
    text-align: center;
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const IntroductionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 420px;
`;

const TeamIntroduction = styled.div`
  display: flex;
  flex-direction: column;
  gap: 96px;

  & > h3:first-child {
    color: #ffffff;
    text-align: left;
    font-style: normal;
    line-height: normal;
    font-size: 3.2rem;
    font-weight: 700;
  }

  & > p:last-child {
    color: #ffffff;
    text-align: left;
    font-style: normal;
    line-height: normal;
    font-size: 2.4rem;
    font-weight: 500;
  }
`;

const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
  line-height: normal;
  font-style: normal;
  gap: 96px;

  & > h3 {
    font-size: 3.2rem;
    font-weight: 700;
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 281px;
    flex-wrap: wrap;
    row-gap: 40px;
    column-gap: 72px;

    & > div {
      & > label {
        font-size: 2.4rem;
        font-weight: 400;
      }
      & > p {
        font-size: 3.2rem;
        font-weight: 700;
      }
    }
  }
`;

export default About;
