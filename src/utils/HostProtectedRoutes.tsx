import UnusualApproach from '@pages/UnusualApproach';
import { Outlet, useLocation } from 'react-router-dom';
import { NoticeAlert } from './customAlert';

const HostProtectedRoutes = () => {
  const { state } = useLocation();

  if (state && state.roomPW) {
    return <Outlet />;
  } else {
    NoticeAlert({ title: '게임방이 존재하지 않습니다.', icon: 'error' });
    return <UnusualApproach />;
  }
};

export default HostProtectedRoutes;
