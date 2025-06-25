import * as S from './styles';
import Header from '@components/Header';
import RoomParticipantContainer from './containers/RoomParticipantContainer';
import RoomSettingContainer from './containers/RoomSettingContainer';
import SocketLoading from '@components/SocketLoading';
import { useSocket } from '@contexts/SocketContext';
import RoomModal from './containers/RoomModalContainer';
import RoomButtonContainer from './containers/RoomButtonContainer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GameLobby() {
  const { state } = useLocation();
  const { isConnect, connectSocket } = useSocket();

  useEffect(() => {
    if (state?.roomPW) {
      (async () => {
        await connectSocket(state.roomPW);
      })();
    }
  }, []);

  return (
    <S.GameLobbyContainer>
      {!isConnect ? <SocketLoading /> : null}
      <RoomModal />

      <Header />
      <S.GameLobbyMain>
        <S.ContentWrapper>
          <RoomSettingContainer />
          <RoomParticipantContainer />
        </S.ContentWrapper>
        <RoomButtonContainer />
      </S.GameLobbyMain>
    </S.GameLobbyContainer>
  );
}
