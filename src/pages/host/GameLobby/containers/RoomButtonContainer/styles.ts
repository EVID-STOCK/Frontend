import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 3rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;

    & > p {
      letter-spacing: 20px;
      text-indent: 20px;
      font-size: 5vw;
    }
  }
`;
