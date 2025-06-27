import * as S from './styles';
import Header from '@components/Header';
import RoomParticipantContainer from './containers/RoomParticipantContainer';
import RoomSettingContainer from './containers/RoomSettingContainer';
import SocketLoading from '@components/SocketLoading';
import { useSocket } from '@contexts/SocketContext';
import RoomModalContainer from './containers/RoomModalContainer';
import RoomButtonContainer from './containers/RoomButtonContainer';
import { useLocation } from 'react-router-dom';
import useConnectSocket from '@hooks/useConnectSocket';

export default function GameLobby() {
  const { state } = useLocation();
  const { isConnect } = useSocket();

  useConnectSocket(state.roomPW);

  return (
    <S.GameLobbyContainer>
      {!isConnect ? <SocketLoading /> : null}
      <RoomModalContainer />

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
