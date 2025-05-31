import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ListLayout from '@components/ListLayout';
import { Student } from 'types/room';
import { useSocket } from '@contexts/SocketContext';
import * as S from './styles';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  status?: string;
  message?: string;
  participants?: Student[];
}

function RoomParticipant({
  participants,
  setParticipants,
}: {
  participants: Student[];
  setParticipants: React.Dispatch<React.SetStateAction<Student[]>>;
}) {
  const { subscribe, sendMessage, isConnect } = useSocket();
  const { state } = useLocation();

  useEffect(() => {
    if (!state?.roomPW || !isConnect) return;
    const handleUpdateParticipants = (message: Message) => {
      if (!message.status) {
        setParticipants(message.participants as Student[]);
      }
    };

    subscribe(
      `/topic/room/participants/${state.roomPW}`,
      handleUpdateParticipants
    );
    sendMessage('/app/room/participants', { roomCode: state.roomPW });
  }, [state.roomPW, isConnect]);

  return (
    <ListLayout title="참여인원" src="/icons/participant_icon.svg">
      <S.ListContainer>
        <S.UserList>
          {participants.map((participant) => {
            return (
              <S.UserProfile key={uuidv4()}>
                {participant.profileNum === 0 ? (
                  <img src="/images/defaultProfile-blue1.png" />
                ) : null}
                {participant.profileNum === 1 ? (
                  <img src="/images/defaultProfile-blue2.png" />
                ) : null}
                {participant.profileNum === 2 ? (
                  <img src="/images/defaultProfile-blue3.png" />
                ) : null}
                <p>{participant.userName}</p>
              </S.UserProfile>
            );
          })}
        </S.UserList>
      </S.ListContainer>
      <S.ListImage src="/images/participantImage.svg" />
    </ListLayout>
  );
}

export default React.memo(RoomParticipant);
