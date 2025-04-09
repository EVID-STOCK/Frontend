import { styled } from 'styled-components';

export const ListLayout = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 2.7rem;

  @media screen and (max-width: 768px) {
    gap: 1.2rem;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  gap: 1.6rem;

  & > img {
    width: 3.2rem;
    height: 3.2rem;
  }

  & > h2 {
    color: #ffffff;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  @media screen and (max-width: 768px) {
    & > img {
      width: 2rem;
      height: 2rem;
    }

    & > h2 {
      font-size: 1.5rem;
    }
  }
`;

export const List = styled.div<{ $title: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: auto;
  padding: ${(props) =>
    props.$title === '결과 조회' ? '37px 21px' : '37px 33px'};
  position: relative;
  border-radius: 25px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 29px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const TwoButton = styled.button`
  width: 274px;
  height: 49px;
  color: #ffffff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  -moz-transition: background, 0.3s;
  -o-transition: background, 0.3s;
  -webkit-transition: background, 0.3s;
  transition: background, 0.3s;
  cursor: pointer;

  &:hover {
    border-radius: 25px;
    background: #a7c2e4;
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 80px;
  padding: 20px 59px;
  color: #ffffff;
  font-size: 3.2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  -moz-transition: background, 0.3s;
  -o-transition: background, 0.3s;
  -webkit-transition: background, 0.3s;
  transition: background, 0.3s;
  cursor: pointer;

  &:focus {
    background-color: #a7c2e4;
  }

  &:hover {
    border-radius: 25px;
    background: #a7c2e4;
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  }
`;
