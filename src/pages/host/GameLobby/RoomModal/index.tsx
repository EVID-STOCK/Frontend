import { useLocation } from 'react-router-dom';
import ModalLayout from './components/ModalLayout';
import RoundModal from './RoundModal';
import PasswordModal from './components/PasswordModal';
import { useSetRoomModal } from './useSetRoomModal';

function RoomModal() {
  const { state } = useLocation();
  const { pwRef, modalState, isModalVisible, handleClickModalBackground } =
    useSetRoomModal();
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
