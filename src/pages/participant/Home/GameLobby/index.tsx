import * as S from './styles';
import useGameLobby from './hooks/useGameLobby';
import ParticipantListItem from './components/ParticipantListItem';

export default function GameLobby() {
  const { handleClickBackButton, participantListData } = useGameLobby();

  return (
    <S.GameLobbyContainer>
      <div onClick={handleClickBackButton}>
        <img src="icons/arrow-left-icon.svg" />
      </div>
      <S.ParticipantListWrapper>
        <S.ListContainer>
          {participantListData?.data?.participants
            ? participantListData?.data?.participants?.map((participant) => {
                return (
                  <ParticipantListItem
                    key={participant.userId}
                    profile={participant.profileNum}
                    userName={participant.userName}
                  />
                );
              })
            : null}
        </S.ListContainer>
      </S.ParticipantListWrapper>
      <p>곧 게임이 시작됩니다.</p>
    </S.GameLobbyContainer>
  );
}
