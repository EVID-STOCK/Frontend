import ActionButton from '@components/ActionButton';
import GameStartButton from '../../components/GameStartButton';
import { Student } from 'types/room';
import useModalState from '@hooks/useModalState';
import * as S from './styles';

export default function RoomButtonContainer({
  participants,
}: {
  participants: Student[];
}) {
  const { openModal } = useModalState();

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
      <GameStartButton participantLength={participants.length} />
    </S.ButtonWrapper>
  );
}
