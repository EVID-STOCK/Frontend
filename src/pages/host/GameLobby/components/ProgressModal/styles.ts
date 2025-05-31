import styled from 'styled-components';
import { rotatedImage } from '@styles/animation';

export const ProgressModalConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 720px;
  height: 320px;
  border-radius: 24px;
  background: #ffffff;
  gap: 64px;

  & > img {
    width: 8rem;
    height: 8rem;
    animation: ${rotatedImage} 1s infinite linear;
  }

  & > div {
    display: flex;
    gap: 80px;

    & > p {
      color: #000000;
      font-size: 4.8rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      &:nth-child(2) {
        width: 130px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    height: auto;
    width: 80%;
    gap: 40px;
    padding: 40px 0;

    & > img {
      width: 50px;
      height: 50px;
    }

    & > div {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;

      & > p {
        font-size: 3rem;

        &:nth-child(2) {
          width: 80px;
        }
      }
    }
  }
`;
