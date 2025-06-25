import ActionButton from '@components/ActionButton';
import GameStartButton from '../../components/GameStartButton';
import useModalState from '@hooks/useModalState';
import * as S from './styles';
import { useGetParticipants } from '@hooks/useParticipantsQuery';

export default function RoomButtonContainer() {
  const { openModal } = useModalState();
  const { data: participantListData } = useGetParticipants();

  const handleClickPasswordButton = () => {
    openModal('hostGameModal', 'password');
  };

  return (
    <S.ButtonWrapper>
      <ActionButton
        value="PASSWORD"
        padding={2}
        borderRadius={25}
        fontSize={3.2}
        onClick={handleClickPasswordButton}
      />
      <GameStartButton
        participantLength={participantListData?.data.participants.length || 1}
      />
    </S.ButtonWrapper>
  );
}
