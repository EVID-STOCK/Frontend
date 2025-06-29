import { useRecoilState } from 'recoil';
import { nameState } from '../states/nameState';
import { roomCodeCompareState } from '../states/roomCodeState';

export default function useUserForm() {
  const [name] = useRecoilState(nameState);
  const [roomCodeCompare] = useRecoilState(roomCodeCompareState);

  return {
    name,
    roomCodeCompare,
  };
}
