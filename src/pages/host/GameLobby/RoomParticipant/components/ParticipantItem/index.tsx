import { Participant } from 'types/room';
import * as S from './styles';

type ParticipantItemProps = Pick<
  Participant,
  'userId' | 'userName' | 'profileNum'
>;

export default function ParticipantItem({
  userId,
  userName,
  profileNum,
}: ParticipantItemProps) {
  return (
    <S.ParticipantItemWrapper key={userId}>
      <img
        src={`/images/profile-blue-${profileNum + 1}.png`}
        alt={`${userName}의 프로필`}
      />
      <p>{userName}</p>
    </S.ParticipantItemWrapper>
  );
}
