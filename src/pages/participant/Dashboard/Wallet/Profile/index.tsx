import { useUser } from '@hooks/queries/useUserQuery';
import React from 'react';
import * as S from './styles';

function Profile() {
  const { data: userData } = useUser();

  return (
    <S.ProfileWrapper>
      {userData?.data.user_info?.profile_num === 0 ? (
        <img src="/images/profile-gray-1.png" />
      ) : null}
      {userData?.data.user_info?.profile_num === 1 ? (
        <img src="/images/profile-gray-2.png" />
      ) : null}
      {userData?.data.user_info?.profile_num === 2 ? (
        <img src="/images/profile-gray-3.png" />
      ) : null}
      <p>{userData?.data.user_info?.username}</p>
    </S.ProfileWrapper>
  );
}

export default React.memo(Profile);
