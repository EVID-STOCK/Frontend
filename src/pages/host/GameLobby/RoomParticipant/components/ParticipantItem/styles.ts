import styled from 'styled-components';

export const ParticipantItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;

  & > img {
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 100px;
  }

  & > p {
    color: #ffffff;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: nowrap;
  }

  @media screen and (max-width: 768px) {
    & > img {
      width: 4rem;
      height: 4rem;
    }

    & > p {
      font-size: 1.5rem;
    }
  }
`;
