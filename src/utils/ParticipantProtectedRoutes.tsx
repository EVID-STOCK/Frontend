import { useUser } from '@hooks/useUserQuery';
import { roomCodeState } from '@states/host/roomSetState';
import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { NoticeAlert } from './customAlert';
import UnusualApproach from '@pages/UnusualApproach';

const ParticipantProtectedRoutes = () => {
  const { data: user } = useUser();
  const roomCode = useRecoilValue(roomCodeState);

  if (roomCode && user) {
    return <Outlet />;
  } else {
    NoticeAlert({ title: '유저 정보가 존재하지 않습니다.', icon: 'error' });
    return <UnusualApproach />;
  }
};

export default ParticipantProtectedRoutes;
