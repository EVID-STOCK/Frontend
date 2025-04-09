import styled from 'styled-components';
import React, { useRef } from 'react';
import useSlidingPanel from '@hooks/useSlidingPanel';

function SlidingPanel({ children }: { children: React.ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { isSlidingOpen, closeSliding } = useSlidingPanel();

  const onClickBlackBackground = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      !panelRef.current ||
      !panelRef.current.contains(e.target as HTMLDivElement)
    ) {
      closeSliding();
    }
  };

  return (
    <SlidingPanelContainer>
      <Backdrop
        $visible={isSlidingOpen}
        onClick={onClickBlackBackground}
      ></Backdrop>
      {children}
    </SlidingPanelContainer>
  );
}

export default React.memo(SlidingPanel);

const SlidingPanelContainer = styled.section``;

const Backdrop = styled.div<{ $visible: boolean }>`
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
