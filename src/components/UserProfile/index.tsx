import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.pathname.split('/')[1];
  const [visible, setVisible] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const profileImageRef = useRef<HTMLImageElement>(null);

  const handleClickProfile = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        profileRef.current &&
        profileRef.current.contains(e.target as HTMLElement)
      ) {
        return;
      }
      if (
        profileImageRef.current &&
        profileImageRef.current.contains(e.target as HTMLElement)
      ) {
        return;
      }

      setVisible(false);
    };

    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [profileRef]);

  return (
    <UserProfileContainer>
      <UserProfileImage
        ref={profileImageRef}
        src="/images/profile-blue-1.png"
        onClick={handleClickProfile}
      />
      <ProfileDetailContainer ref={profileRef} $visible={visible}>
        <div>
          <img src="/images/profile-blue-1.png" />
          <div>
            <span>현재 역할</span>
            <p>{role === 'host' ? '방장' : '참여자'}</p>
          </div>
        </div>
        <RoleChangeButton onClick={() => navigate('/enter', { replace: true })}>
          역할 바꾸기
        </RoleChangeButton>
      </ProfileDetailContainer>
    </UserProfileContainer>
  );
}

export default React.memo(UserProfile);

const UserProfileImage = styled.img`
  width: 15vw;
  max-width: 8rem;
  border: 1px solid #d6d6d6;
  border-radius: 100%;
  box-shadow: 2px 3px 5px 0.1px #00000046;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent; /* iOS 및 Android Safari */
  -moz-tap-highlight-color: transparent; /* Firefox */
`;

const UserProfileContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 2rem;
  gap: 2rem;
  z-index: 100;
`;

const ProfileDetailContainer = styled.section<{ $visible: boolean }>`
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  top: 9vh;
  background-color: white;
  border-radius: 1.6rem;
  overflow: hidden;
  padding: 2rem;
  width: 60vw;
  min-width: 20rem;
  max-width: 30rem;
  box-shadow: 2px 3px 5px 0.1px #00000046;
  gap: 1rem;
  max-width: 30rem;

  & > div {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1.5rem;

    & > img {
      width: 30%;
    }

    & > div {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;

      span {
        color: #505050;
        font-weight: 500;
        font-size: 1.5rem;
      }

      p {
        color: black;
        font-weight: bold;
        font-size: 2.5rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    min-width: 50%;

    & > div {
      display: flex;
      align-items: center;
      width: 300px;
      gap: 1.5rem;

      & > img {
        width: 20%;
      }

      & > div {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;

        span {
          color: #505050;
          font-weight: 500;
          font-size: 1.5rem;
        }

        p {
          color: black;
          font-weight: bold;
          font-size: 2.5rem;
        }
      }
    }
  }
`;

const RoleChangeButton = styled.button`
  background-color: #a7c2e4;
  padding: 1.5rem;
  width: 100%;
  border-radius: 1rem;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -moz-tap-highlight-color: transparent;

  &:active {
    background-color: #a1b9d7;
  }
  &:hover {
    background-color: #a1b9d7;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
