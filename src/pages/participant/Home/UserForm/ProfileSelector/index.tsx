import React, { useEffect, useRef } from 'react';
import * as S from './styles';
import useProfileSelector from './useProfileSelector';

function ProfileSelector({
  profileRef,
  visible,
  setVisible,
  setSelectedProfile,
}: {
  profileRef: React.RefObject<HTMLImageElement | null>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedProfile: React.Dispatch<React.SetStateAction<0 | 1 | 2>>;
}) {
  const { profileSelectorRef } = useProfileSelector({
    profileRef,
    visible,
    setVisible,
  });

  return (
    <S.ProfileSelectorContainer ref={profileSelectorRef} $visible={visible}>
      <S.SlidingDoor>
        <span></span>
      </S.SlidingDoor>
      <S.ProfileList>
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
      </S.ProfileList>
    </S.ProfileSelectorContainer>
  );
}

export default React.memo(ProfileSelector);
