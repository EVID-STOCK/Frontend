import useSetProfile from '../hooks/useSetProfile';
import useSetName from '../hooks/useSetName';
import { useRef } from 'react';
import ProfileSelector from '../ProfileSelector';
import * as S from './styles';

const PROFILE_LIST: Record<number, string> = {
  0: '/images/profile-blue-1.png',
  1: '/images/profile-blue-2.png',
  2: '/images/profile-blue-3.png',
};

export default function UserProfile() {
  const {
    selectedProfile,
    profileSelectorVisible,
    setProfileSelectorVisible,
    setSelectedProfile,
    handleProfileClick,
  } = useSetProfile();
  const { name } = useSetName();
  const profileRef = useRef<HTMLImageElement>(null);

  return (
    <>
      <S.UserProfileWrapper $nameState={name.state}>
        <img
          ref={profileRef}
          src={PROFILE_LIST[selectedProfile]}
          onClick={handleProfileClick}
        />
        <img
          src="/icons/modify-profile-icon.svg"
          onClick={handleProfileClick}
        />
      </S.UserProfileWrapper>
      <ProfileSelector
        profileRef={profileRef}
        visible={profileSelectorVisible}
        setVisible={setProfileSelectorVisible}
        setSelectedProfile={setSelectedProfile}
      />
    </>
  );
}
