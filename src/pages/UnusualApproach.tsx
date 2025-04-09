import ActionButton from '@components/ActionButton';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function UnusualApproach() {
  const navigate = useNavigate();

  const handleClickPrevButton = () => {
    navigate(-1);
  };

  return (
    <UnusualApproachContainer>
      <NoticeWrapper>
        <img src="/icons/error_icon.png" />
        <p>
          비정상적인 접근입니다 <br />
          이전 페이지로 돌아가세요
        </p>
      </NoticeWrapper>
      <ButtonWrapper>
        <ActionButton
          padding={2}
          value={'이전 페이지로 이동하기'}
          onClick={handleClickPrevButton}
          borderRadius={15}
          fontSize={2}
        />
      </ButtonWrapper>
    </UnusualApproachContainer>
  );
}

const UnusualApproachContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-height: 50rem;
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
  padding-bottom: 15vh;
  gap: 3rem;
`;

const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > img {
    width: 15rem;
    margin-bottom: 2rem;
  }

  & > p {
    color: #ffffff;
    font-size: 2rem;
    font-style: normal;
    font-weight: 300;
    line-height: 2.5rem;
    word-break: break-all;
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    & > img {
      width: 10rem;
    }

    & > p {
      font-size: 1.7rem;
    }
  }
`;

const ButtonWrapper = styled.div`
  width: 80%;
  max-width: 30rem;
`;

export default UnusualApproach;
