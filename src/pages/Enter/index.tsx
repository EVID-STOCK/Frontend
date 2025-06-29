import { useNavigate } from 'react-router-dom';
import * as S from './styles';

export default function Enter() {
  const navigate = useNavigate();
  const handleClickHost = () => {
    import('@pages/host/Home');
    import('@pages/host/GameLobby');
    import('@pages/host/GameResult');
    navigate('/host');
  };

  const handleClickParticipant = () => {
    import('@pages/participant/Home');
    import('@pages/participant/Dashboard');
    import('@pages/participant/Purchase');
    import('@pages/participant/Sell');
    navigate('/participant');
  };

  return (
    <S.EnterContainer>
      <S.LogoWrapper>
        <img src="/images/signature-logo.svg" />
      </S.LogoWrapper>
      <S.PlayerRoleSelector>
        <p>게임에서의 역할을 정해주세요</p>
        <S.SelectorWrapper>
          <S.RoleWrapper>
            <img src="/images/profile-blue-1.png" onClick={handleClickHost} />
            <span>방장</span>
          </S.RoleWrapper>
          <S.RoleWrapper>
            <img
              src="/images/profile-blue-1.png"
              onClick={handleClickParticipant}
            />
            <span>참여자</span>
          </S.RoleWrapper>
        </S.SelectorWrapper>
      </S.PlayerRoleSelector>
    </S.EnterContainer>
  );
}
