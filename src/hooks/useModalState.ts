import { useRecoilState } from 'recoil';
import { modalState } from '@states/participant/modalState';

export default function useModalState() {
  const [modals, setModals] = useRecoilState(modalState);

  const openModal = (key: string, state: string | null) => {
    setModals((prev) => ({
      ...prev,
      [key]: { isOpen: true, state },
    }));
  };

  const closeModal = (key: string) => {
    setModals((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const isOpen = (key: string): boolean => {
    return !!modals[key]?.isOpen;
  };

  const state = (key: string): string | null => {
    return modals[key]?.state;
  };

  return {
    openModal,
    closeModal,
    isOpen,
    state,
  };
}
