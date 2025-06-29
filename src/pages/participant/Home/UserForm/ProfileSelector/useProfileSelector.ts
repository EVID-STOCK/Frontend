import { useEffect, useRef } from 'react';

export default function useProfileSelector({
  profileRef,
  visible,
  setVisible,
}: {
  profileRef: React.RefObject<HTMLImageElement | null>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const profileSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!visible) return;
      if (
        !profileSelectorRef.current?.contains(e.target as Node) &&
        !profileRef.current?.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [profileSelectorRef, profileRef, visible]);

  return { profileSelectorRef };
}
