import useSetRoomCode from '../hooks/useSetRoomCode';
import useSetName from '../hooks/useSetName';
import * as S from './styles';

export default function RoomCodeForm() {
  const { roomCode, setRoomCode, handleOnCodeKeyPress } = useSetRoomCode();
  const { name } = useSetName();

  return (
    <S.RoomCodeFormContainer onSubmit={handleOnCodeKeyPress}>
      <S.RoomCodeInput
        $nameState={name.state}
        $codeState={roomCode?.state}
        type="text"
        placeholder="입장 코드를 입력하세요"
        disabled={!name.state ? !roomCode?.state : roomCode?.state}
        maxLength={6}
        value={roomCode.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRoomCode((prev) => ({ ...prev, value: e.target.value }));
        }}
      />
      <button type="submit" hidden />
    </S.RoomCodeFormContainer>
  );
}
