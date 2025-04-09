import styled from 'styled-components';

export const GameLobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 32px;
  position: relative;

  // 뒤로가기 아이콘
  & > div:nth-child(1) {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 12px;
    left: 12px;
  }

  & > p {
    color: #ffffff;
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 30px;
  }
`;

export const ParticipantListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1.8rem 2.1rem;
  border-radius: 16px;
  width: 100%;
  height: 62.3%;
  background: rgba(255, 255, 255, 0.4);
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  & img {
    width: 56px;
    height: 56px;
    border-radius: 100px;
  }
`;
