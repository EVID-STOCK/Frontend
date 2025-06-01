import styled from 'styled-components';

export default function ParticipantListItem({
  profile,
  userName,
}: {
  profile: 0 | 1 | 2;
  userName: string;
}) {
  return (
    <ParticipantListItemWrapper>
      {profile === 0 ? <img src="/images/profile-blue-1.png" /> : null}
      {profile === 1 ? <img src="/images/profile-blue-2.png" /> : null}
      {profile === 2 ? <img src="/images/profile-blue-3.png" /> : null}
      <p>{userName}</p>
    </ParticipantListItemWrapper>
  );
}

const ParticipantListItemWrapper = styled.li`
  display: flex;
  align-items: center;
  color: #ffffff;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  gap: 24px;
  padding: 0 8px;
`;
