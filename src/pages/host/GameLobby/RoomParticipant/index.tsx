import React from 'react';
import ListLayout from '@components/ListLayout';
import { useRoomParticipants } from './useRoomParticipants';
import * as S from './styles';
import { useLocation } from 'react-router-dom';
import ParticipantItem from './components/ParticipantItem';

function RoomParticipant() {
  const { state } = useLocation();
  const { participants } = useRoomParticipants(state.roomPW);

  return (
    <ListLayout title="참여인원" src="/icons/participant-icon.svg">
      <S.ListContainer>
        <S.ParticipantList>
          {participants.map((participant) => (
            <ParticipantItem {...participant} />
          ))}
        </S.ParticipantList>
        <S.ListImage src="/images/participant-image.svg" />
      </S.ListContainer>
    </ListLayout>
  );
}

export default React.memo(RoomParticipant);
