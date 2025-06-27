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

export const ParticipantList = styled.div`
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
