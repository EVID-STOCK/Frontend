import useCreateRoom from './useCreateRoom';
import * as S from './styles';

function CreateRoomButton() {
  const { handleClickCreateRoomButton } = useCreateRoom();
  return (
    <S.CreateRoomButtonWrapper onClick={handleClickCreateRoomButton}>
      <img src="/icons/add-icon.svg" alt="방만들기 아이콘" />
      <p>Create New Room</p>
    </S.CreateRoomButtonWrapper>
  );
}

export default CreateRoomButton;
