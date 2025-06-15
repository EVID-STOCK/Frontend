import { useState } from 'react';
import * as S from './styles';
import Header from '@components/Header';
import { Student } from 'types/room';
import RoomParticipantContainer from './containers/RoomParticipantContainer';
import RoomSettingContainer from './containers/RoomSettingContainer';
import SocketLoading from '@components/SocketLoading';
import { useSocket } from '@contexts/SocketContext';
import RoomModal from './containers/RoomModalContainer';
import RoomButtonContainer from './containers/RoomButtonContainer';

export default function GameLobby() {
  const { isConnect } = useSocket();
  const [participants, setParticipants] = useState<Student[]>([]);

  return (
    <S.GameLobbyContainer>
      {!isConnect ? <SocketLoading /> : null}
      <RoomModal />

      <Header />
      <S.GameLobbyMain>
        <S.ContentWrapper>
          <RoomSettingContainer />
          <RoomParticipantContainer
            participants={participants}
            setParticipants={setParticipants}
          />
        </S.ContentWrapper>
        <RoomButtonContainer participants={participants} />
      </S.GameLobbyMain>
    </S.GameLobbyContainer>
  );
}
