import {
  profileSelectorVisibleState,
  selectedProfileState,
} from '@pages/participant/Home/UserForm/states/profileState';
import { useRecoilState } from 'recoil';

export default function useSetProfile() {
  const [profileSelectorVisible, setProfileSelectorVisible] = useRecoilState(
    profileSelectorVisibleState
  );
  const [selectedProfile, setSelectedProfile] =
    useRecoilState(selectedProfileState);

  const handleProfileClick = () => {
    setProfileSelectorVisible(true);
  };

  return {
    selectedProfile,
    handleProfileClick,
    setProfileSelectorVisible,
    setSelectedProfile,
    profileSelectorVisible,
  };
}
