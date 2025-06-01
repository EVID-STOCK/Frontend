import { useSocket } from '@contexts/SocketContext';
import { roomCodeState } from '@states/host/roomSetState';
import { participantsState } from '@states/participant/roomEntryState';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Participant } from 'types/room';
import * as S from './styles';
import ParticipantListItem from '../components/ParticipantListItem';
import { v4 as uuidv4 } from 'uuid';

export default function ParticipantsGameLobby({
  handleClickBackButton,
}: {
  handleClickBackButton: () => void;
}) {
  const navigate = useNavigate();
  const { socket, subscribe, sendMessage } = useSocket();
  const [participants, setParticipants] = useRecoilState(participantsState);
  const roomCode = useRecoilValue(roomCodeState);
  const key = useMemo(() => uuidv4(), []);

  useEffect(() => {
    if (!socket) return;

    const handleUpdateParticipants = (message: any) => {
      // console.log('message???', message);
      if (message.status === 'start') {
        navigate('wallet', {
          state: { permit: true },
        });
      } else {
        setParticipants(message.participants as Participant[]);
      }
    };
    subscribe(`/topic/room/participants/${roomCode}`, handleUpdateParticipants);
    sendMessage('/app/room/participants', { roomCode });
  }, [socket, roomCode]);

  return (
    <S.GameLobbyContainer>
      <div onClick={handleClickBackButton}>
        <img src="icons/arrow-left-icon.svg" />
      </div>
      <S.ParticipantListWrapper>
        <S.ListContainer>
          {participants.map((participant) => {
            return (
              <ParticipantListItem
                key={key}
                profile={participant.profileNum}
                userName={participant.userName}
              />
            );
          })}
        </S.ListContainer>
      </S.ParticipantListWrapper>
      <p>곧 게임이 시작됩니다.</p>
    </S.GameLobbyContainer>
  );
}
