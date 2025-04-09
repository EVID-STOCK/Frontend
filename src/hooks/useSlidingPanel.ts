import { useRecoilState } from 'recoil';
import useModalState from './useModalState';
import { SlidingPanelState } from '@states/participant/modalState';

export default function useSlidingPanel() {
  const { openModal, closeModal, isOpen } = useModalState();
  const key = 'stockSlidingPanel';

  const [panelState, setPanelState] = useRecoilState(SlidingPanelState);

  return {
    isSlidingOpen: isOpen(key),
    openSliding: () => openModal(key, null),
    closeSliding: () => closeModal(key),
    slidingState: panelState,
    setSlidingState: setPanelState,
  };
}
