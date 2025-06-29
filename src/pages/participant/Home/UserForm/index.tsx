import UserProfile from './UserProfile';
import NameForm from './NameForm';
import RoomCodeForm from './RoomCodeForm';
import useUserForm from './hooks/useUserForm';
import * as S from './styles';

export default function UserForm() {
  const { name, roomCodeCompare } = useUserForm();

  return (
    <S.UserFormContainer>
      <S.SetUserInfo $nameState={name.state}>
        <UserProfile />
        <NameForm />
        <RoomCodeForm />
      </S.SetUserInfo>

      <S.Notice $state={roomCodeCompare.state}>{roomCodeCompare.text}</S.Notice>
    </S.UserFormContainer>
  );
}
