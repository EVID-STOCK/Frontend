import GameStartButton from './GameStartButton';
import * as S from './styles';
import { useGetParticipantsQuery } from '@hooks/queries/useParticipantsQuery';
import PasswordButton from './PasswordButton';

export default function RoomButtons() {
  const { data: participantListData } = useGetParticipantsQuery();
  const participantLength = participantListData?.data.participants.length ?? 0;

  return (
    <S.ButtonWrapper>
      <PasswordButton />
      <GameStartButton participantLength={participantLength} />
    </S.ButtonWrapper>
  );
}
