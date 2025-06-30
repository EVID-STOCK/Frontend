import { fetchRoomSettings } from '@apis/api/game';
import { roomCodeState } from '@states/host/roomSetState';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';

export default function useGetRoomSettingsQuery() {
  const persistRoomCode = useRecoilValue(roomCodeState);

  return useQuery(['roomSetting'], () => fetchRoomSettings(persistRoomCode!), {
    enabled: !!persistRoomCode,
    refetchOnWindowFocus: false,
  });
}
