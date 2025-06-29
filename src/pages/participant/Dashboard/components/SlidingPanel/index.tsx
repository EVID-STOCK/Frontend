import React, { useRef } from 'react';
import useSlidingPanel from '@hooks/useSlidingPanel';
import * as S from './styles';

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
    <S.SlidingPanelContainer>
      <S.Backdrop
        $visible={isSlidingOpen}
        onClick={onClickBlackBackground}
      ></S.Backdrop>
      {children}
    </S.SlidingPanelContainer>
  );
}

export default React.memo(SlidingPanel);
