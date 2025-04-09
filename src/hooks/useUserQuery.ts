import { useQuery } from 'react-query';
import { fetchUserInfo } from '@apis/api/wallet';
import { useRecoilValue } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';

export const useUser = () => {
  const roomCode = useRecoilValue(roomCodeState);

  return useQuery(['userInfo', roomCode], () => fetchUserInfo(roomCode!), {
    enabled: !!roomCode,
    retry: 1,
    suspense: true,
    useErrorBoundary: true,
  });
};
