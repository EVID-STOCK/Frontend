import styled from 'styled-components';

export const ProfileWrapper = styled.section`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 16px 24px;
  border-radius: 16px;
  gap: 16px;

  & > img {
    border-radius: 100px;
    width: 64px;
    height: 64px;
  }

  & > p {
    color: #000000;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
