import { useNavigate } from 'react-router-dom';
import * as S from './styles';

export default function Enter() {
  const navigate = useNavigate();
  const handleClickHost = () => {
    navigate('/host');
  };

  const handleClickParticipant = () => {
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
