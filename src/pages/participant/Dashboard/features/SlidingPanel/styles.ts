import styled from 'styled-components';

export const SlidingPanelContainer = styled.div``;

export const Backdrop = styled.div<{ $visible: boolean }>`
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(2px);
  position: fixed;
  z-index: 0;
  overflow: hidden;
  inset: 0;
`;
