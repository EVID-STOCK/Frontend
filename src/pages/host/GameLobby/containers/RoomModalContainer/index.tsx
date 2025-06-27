import { useLocation } from 'react-router-dom';
import ModalLayout from '../../components/ModalLayout';
import RoundModal from '../../components/RoundModal';
import { useRoomModal } from './useRoomModal';
import PasswordModal from '../../components/PasswordModal';

function RoomModal() {
  const { state } = useLocation();
  const { pwRef, modalState, isModalVisible, handleClickModalBackground } =
    useRoomModal();
  const roomPW = state?.roomPW ?? '비밀번호 없음';

  return (
    <ModalLayout onClick={handleClickModalBackground} visible={isModalVisible}>
      {modalState === 'password' && (
        <PasswordModal ref={pwRef} roomCode={roomPW} />
      )}
      {(modalState === 'game' || modalState === 'gameover') && <RoundModal />}
    </ModalLayout>
  );
}
export default RoomModal;
