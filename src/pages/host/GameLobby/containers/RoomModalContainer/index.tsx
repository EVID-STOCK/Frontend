import useModalState from '@hooks/useModalState';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import * as S from './styles';
import ModalLayout from '../../components/ModalLayout';
import RoundModal from '../../components/RoundModal';

function RoomModal() {
  const { state } = useLocation();
  const pwRef = useRef<HTMLDivElement>(null);
  const { closeModal, state: modalState, isOpen } = useModalState();

  const handleClickModalBackground = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      // 현재 클릭한 버튼이 패스워드일 경우에만, 바탕을 클릭했을 때 사라지도록 설정
      modalState('hostGameModal') === 'password' &&
      (!pwRef.current || !pwRef.current.contains(e.target as HTMLDivElement))
    ) {
      closeModal('hostGameModal');
    }
  };
  return (
    <ModalLayout
      onClick={handleClickModalBackground}
      visible={isOpen('hostGameModal')}
    >
      {modalState('hostGameModal') === 'password' ? (
        <S.Password ref={pwRef}>
          <p>{state.roomPW}</p>
        </S.Password>
      ) : null}
      {modalState('hostGameModal') === 'game' ||
      modalState('hostGameModal') === 'gameover' ? (
        <RoundModal />
      ) : null}
    </ModalLayout>
  );
}
export default RoomModal;
