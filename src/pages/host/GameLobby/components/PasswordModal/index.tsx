import * as S from './styles';

function PasswordModal({
  ref,
  roomCode,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  roomCode: string;
}) {
  return (
    <S.Password ref={ref}>
      <p>{roomCode}</p>
    </S.Password>
  );
}

export default PasswordModal;
