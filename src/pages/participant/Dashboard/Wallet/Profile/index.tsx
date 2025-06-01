import { useUser } from '@hooks/useUserQuery';
import React from 'react';
import styled from 'styled-components';

function Profile() {
  const { data } = useUser();

  return (
    <ProfileWrapper>
      {data?.user_info?.profile_num === 0 ? (
        <img src="/images/profile-gray-1.png" />
      ) : null}
      {data?.user_info?.profile_num === 1 ? (
        <img src="/images/profile-gray-2.png" />
      ) : null}
      {data?.user_info?.profile_num === 2 ? (
        <img src="/images/profile-gray-3.png" />
      ) : null}
      <p>{data?.user_info?.username}</p>
    </ProfileWrapper>
  );
}

export default React.memo(Profile);

const ProfileWrapper = styled.section`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 16px 24px;
  border-radius: 16px;
  gap: 16px;

  & > img {
    border-radius: 100px;
    width: 64px;
    height: 64px;
  }

  & > p {
    color: #000000;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
