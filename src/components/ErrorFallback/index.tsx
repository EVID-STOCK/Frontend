import styled from 'styled-components';
import ActionButton from '@pages/participant/components/ActionButton';

export default function ErrorFallback({ error, resetErrorBoundary }: any) {
  console.log(error);
  return (
    <ErrorFallbackContainer role="alert">
      <div>
        <img src="/images/errorImage-gray.png" />
        <p>
          앗, 로딩에 실패했어요. <br />
          다시 시도해주세요
        </p>
      </div>
      <ActionButton
        onClick={resetErrorBoundary}
        value="다시 시도하기"
      ></ActionButton>
    </ErrorFallbackContainer>
  );
}

const ErrorFallbackContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 15vh 5rem 0 5rem;
  align-items: center;
  height: 100%;
  gap: 4rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1.3rem;

    & > img {
      width: 13rem;
    }

    & > p {
      text-align: center;
      font-size: 1.5rem;
      font-weight: 600;
      color: #414141;
      line-height: 2.3rem;
    }
  }
`;
