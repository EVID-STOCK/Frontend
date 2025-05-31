import ActionButton from '@components/ActionButton';
import useGameStart from './useGameStart';

function GameStartButton({ participantLength }: { participantLength: number }) {
  const handleClickGameStartButton = useGameStart(participantLength);

  return (
    <ActionButton
      value="GAME START"
      padding={2}
      borderRadius={25}
      fontSize={3.2}
      onClick={handleClickGameStartButton}
    />
  );
}

export default GameStartButton;
