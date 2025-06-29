import * as S from './styles';

const PROFILE_LIST: Record<number, string> = {
  0: '/images/profile-blue-1.png',
  1: '/images/profile-blue-2.png',
  2: '/images/profile-blue-3.png',
};

export default function ParticipantListItem({
  profile,
  userName,
}: {
  profile: 0 | 1 | 2;
  userName: string;
}) {
  return (
    <S.ParticipantListItemWrapper>
      <img src={PROFILE_LIST[profile]} />
      <p>{userName}</p>
    </S.ParticipantListItemWrapper>
  );
}
