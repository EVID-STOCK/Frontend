import useModalState from '@hooks/useModalState';
import { useRef } from 'react';

export function useRoomModal() {
  const pwRef = useRef<HTMLDivElement>(null);
  const { closeModal, state: getModalState, isOpen } = useModalState();

  const modalState = getModalState('hostGameModal');
  const isModalVisible = isOpen('hostGameModal');

  const handleClickModalBackground = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      modalState === 'password' &&
      (!pwRef.current || !pwRef.current.contains(e.target as HTMLDivElement))
    ) {
      closeModal('hostGameModal');
    }
  };

  return {
    pwRef,
    modalState,
    isModalVisible,
    handleClickModalBackground,
  };
}
