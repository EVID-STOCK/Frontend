import styled from 'styled-components';

export const ParticipantHomeContainer = styled.main`
  background: linear-gradient(
    108deg,
    #3f51b5 4.42%,
    #00bcd4 99.95%,
    #03a9f4 99.95%
  );
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  min-height: 600px; // 모바일에서 pagination 올라오는 거 방지
`;
