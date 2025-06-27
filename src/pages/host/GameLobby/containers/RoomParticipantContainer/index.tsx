import React from 'react';
import ListLayout from '@components/ListLayout';
import { useRoomParticipants } from './useRoomParticipants';
import * as S from './styles';
import { useLocation } from 'react-router-dom';

function RoomParticipantContainer() {
  const { state } = useLocation();
  const { participants } = useRoomParticipants(state.roomPW);

  return (
    <ListLayout title="참여인원" src="/icons/participant-icon.svg">
      <S.ListContainer>
        <S.UserList>
          {participants.map((participant) => (
            <S.UserProfile key={participant.userId}>
              <img
                src={`/images/profile-blue-${participant.profileNum + 1}.png`}
                alt={`${participant.userName}의 프로필`}
              />
              <p>{participant.userName}</p>
            </S.UserProfile>
          ))}
        </S.UserList>
        <S.ListImage src="/images/participant-image.svg" />
      </S.ListContainer>
    </ListLayout>
  );
}

export default React.memo(RoomParticipantContainer);
