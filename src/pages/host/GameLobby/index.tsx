import useConnectSocket from '@hooks/useConnectSocket';
import { useLocation } from 'react-router-dom';
import * as S from './styles';
import SocketLoading from '@components/SocketLoading';
import Header from '@components/Header';
import RoomModal from './RoomModal';
import RoomSetting from './RoomSetting';
import RoomParticipant from './RoomParticipant';
import RoomButtons from './RoomButtons';

export default function GameLobbyPage() {
  const { state } = useLocation();
  const { isConnect } = useConnectSocket(state.roomPW);

  return (
    <S.GameLobbyContainer>
      {!isConnect ? <SocketLoading /> : null}
      <RoomModal />

      <Header />
      <S.GameLobbyMain>
        <S.ContentWrapper>
          <RoomSetting />
          <RoomParticipant />
        </S.ContentWrapper>
        <RoomButtons />
      </S.GameLobbyMain>
    </S.GameLobbyContainer>
  );
}
