import styled from 'styled-components';

export const ListContainer = styled.div`
  height: calc(100vh - 88px);
  min-height: 80rem;
  max-height: 100rem;

  @media screen and (max-width: 768px) {
    height: 40rem;
    min-height: unset;
    max-height: unset;
  }
`;

export const UserList = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 2.2rem 7.9rem;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const UserProfile = styled.div`
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

export const ListImage = styled.img`
  align-self: center;
  position: absolute;
  bottom: 9rem;
  opacity: 0.3;
  pointer-events: none;

  @media screen and (max-width: 768px) {
    width: 20rem;
    bottom: 2rem;
    right: 2rem;
  }
`;
