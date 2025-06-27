import styled from 'styled-components';

export const Password = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72rem;
  height: 24rem;
  border-radius: 2.4rem;
  background: #ffffff;

  & > p {
    color: #000000;
    font-size: 6.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 51.2px; // 마지막 글자에도 간격 처리 됨.
    text-indent: 51.2px; // 따라서 들여쓰기 기능 추가
  }

  @media screen and (max-width: 768px) {
    width: 80%;
    height: auto;
    max-width: 400px;
    padding: 30px 0;

    & > p {
      letter-spacing: 20px;
      text-indent: 20px;
      font-size: 5vw;
    }
  }
`;
