import { useSocket } from '@contexts/SocketContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles';
import ParticipantListItem from '../components/ParticipantListItem';
import { useGetParticipants } from '@hooks/useParticipantsQuery';
import { useQueryClient } from 'react-query';

export default function ParticipantsGameLobby({
  handleClickBackButton,
}: {
  handleClickBackButton: () => void;
}) {
  const navigate = useNavigate();
  const { registerCallback } = useSocket();
  const { data: participantListData } = useGetParticipants();
  const queryClient = useQueryClient();

  useEffect(() => {
    registerCallback('GAME_START', () => {
      navigate('wallet', {
        state: { permit: true },
      });
    });
    registerCallback('ROOM_JOIN', () => {
      console.log('room_join이군요');
      queryClient.invalidateQueries(['participants']);
    });
    registerCallback('ROOM_LEAVE', () => {
      queryClient.invalidateQueries(['participants']);
    });
  }, []);

  return (
    <S.GameLobbyContainer>
      <div onClick={handleClickBackButton}>
        <img src="icons/arrow-left-icon.svg" />
      </div>
      <S.ParticipantListWrapper>
        <S.ListContainer>
          {participantListData?.data?.participants ? (
            participantListData?.data?.participants?.map((participant: any) => {
              return (
                <ParticipantListItem
                  key={participant.userId}
                  profile={participant.profileNum}
                  userName={participant.userName}
                />
              );
            })
          ) : (
            <div>값 없음</div>
          )}
        </S.ListContainer>
      </S.ParticipantListWrapper>
      <p>곧 게임이 시작됩니다.</p>
    </S.GameLobbyContainer>
  );
}
