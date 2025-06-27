import { useSocket } from '@contexts/SocketContext';
import useConnectSocket from '@hooks/useConnectSocket';
import { useLocation } from 'react-router-dom';
import * as S from './styles';
import SocketLoading from '@components/SocketLoading';
import RoomModalContainer from '../RoomModalContainer';
import Header from '@components/Header';
import RoomSettingContainer from '../RoomSettingContainer';
import RoomParticipantContainer from '../RoomParticipantContainer';
import RoomButtonContainer from '../RoomButtonContainer';

export default function GameLobbyContainer() {
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
