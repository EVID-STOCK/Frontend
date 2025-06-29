import { roomCodeState } from '../states/roomCodeState';
import { defaultAlert } from '@utils/customAlert';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { nameState } from '../states/nameState';

export default function useSetName() {
  const [name, setName] = useRecoilState(nameState);
  const setRoomCode = useSetRecoilState(roomCodeState);

  const handleClickNameInput = () => {
    if (name.state) {
      setName((prev) => ({ ...prev, state: false }));
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName((prev) => ({ ...prev, value: e.target.value }));
  };

  const confirmName = () => {
    setName((prev) => ({ ...prev, state: true }));
  };

  const resetRoomCodeConfirmation = () => {
    setRoomCode((prev) => ({ ...prev, state: false }));
  };

  const handleOnNameKeyPress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.value.length === 0) {
      defaultAlert('이름을 입력하지 않았습니다.');
      return;
    }
    confirmName();
    resetRoomCodeConfirmation();
  };

  return {
    name,
    setName,
    handleOnNameKeyPress,
    handleClickNameInput,
    handleChangeName,
  };
}
