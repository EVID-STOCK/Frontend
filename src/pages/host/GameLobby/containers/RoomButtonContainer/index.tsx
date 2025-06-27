import ActionButton from '@components/ActionButton';
import GameStartButton from '../../components/GameStartButton';
import useModalState from '@hooks/useModalState';
import * as S from './styles';
import { useGetParticipants } from '@hooks/useParticipantsQuery';

export default function RoomButtonContainer() {
  const { openModal } = useModalState();
  const { data: participantListData } = useGetParticipants();
  const participantLength = participantListData?.data.participants.length ?? 0;

  return (
    <S.ButtonWrapper>
      <ActionButton
        value="PASSWORD"
        padding={2}
        borderRadius={25}
        fontSize={3.2}
        onClick={() => openModal('hostGameModal', 'password')}
      />
      <GameStartButton participantLength={participantLength} />
    </S.ButtonWrapper>
  );
}
