import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

function ProfileSelector({
  profileRef,
  visible,
  setVisible,
  setSelectedProfile,
}: {
  profileRef: React.RefObject<HTMLImageElement>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProfile: React.Dispatch<React.SetStateAction<number>>;
}) {
  const profileSelectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!visible) return;
      if (
        !profileSelectorRef.current?.contains(e.target as Node) &&
        !profileRef.current?.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [profileSelectorRef, profileRef, visible]);

  return (
    <ProfileSelectorContainer ref={profileSelectorRef} $visible={visible}>
      <SlidingDoor>
        <span></span>
      </SlidingDoor>
      <Profiles>
        <img
          src="/images/profile-gray-1.png"
          onClick={() => {
            setSelectedProfile(0);
          }}
        />
        <img
          src="/images/profile-gray-2.png"
          onClick={() => {
            setSelectedProfile(1);
          }}
        />
        <img
          src="/images/profile-gray-3.png"
          onClick={() => {
            setSelectedProfile(2);
          }}
        />
      </Profiles>
    </ProfileSelectorContainer>
  );
}

export default React.memo(ProfileSelector);

const ProfileSelectorContainer = styled.div<{ $visible: boolean }>`
  width: 100%;
  height: 24rem;
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  border-radius: 16px 16px 0 0;
  transform: ${(props) =>
    props.$visible ? 'translateY(-0%)' : 'translateY(100%)'};
  transition: ${(props) =>
    props.$visible ? 'transform 0.6s ease-out' : 'transform 0.6s ease-in'};
`;

const Profiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3.2rem 1.6rem 3.5rem 1.6rem;
  gap: 1rem;
  overflow-x: auto;

  & > img {
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    cursor: pointer;
  }
`;

const SlidingDoor = styled.div`
  height: 72.5px;
  border-bottom: 0.5px solid rgba(60, 60, 67, 0.18);
  position: relative;
  display: flex;
  justify-content: center;

  & > span {
    display: inline-block;
    width: 13.4rem;
    height: 5px;
    border-radius: 100px;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 1.2rem;
  }
`;
