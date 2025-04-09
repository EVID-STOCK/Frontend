import styled from 'styled-components';

export const EnterContainer = styled.div`
  background: linear-gradient(
    108deg,
    #3f51b5 4.42%,
    #00bcd4 99.95%,
    #03a9f4 99.95%
  );
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(var(--vh, 1vh) * 100);
  min-height: 600px; // 모바일에서 pagination 올라오는 거 방지
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 32px;

  @media screen and (max-width: 768px) {
    & > img {
      width: 120px;
    }
  }
`;

export const PlayerRoleSelector = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  padding-top: 20vh;
  overflow: hidden;
  gap: 5rem;

  & > p {
    color: white;
    font-size: 2.5rem;
  }

  @media screen and (max-width: 768px) {
    & > p {
      font-size: 1.5rem;
    }
  }
`;

export const SelectorWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

export const RoleWrapper = styled.div`
  flex: 1 1 50%; /* 동일한 비율로 차지하면서 50% 기준 유지 */
  max-width: 35%; /* 최대 너비 제한 */
  height: auto; /* 가로세로 비율 유지 */
  object-fit: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;
  font-size: 2rem;

  & > img {
    width: 100%;
    border-radius: 100%;
    cursor: pointer;

    &:active {
      box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
      -webkit-tap-highlight-color: transparent;
      -moz-tap-highlight-color: transparent;
    }

    &:hover {
      box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
    }
  }
`;
