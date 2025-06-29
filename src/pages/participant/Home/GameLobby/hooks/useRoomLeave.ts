import { leaveGameRoom } from '@apis/api/game';
import { useSocket } from '@contexts/SocketContext';
import {
  currentRoundState,
  roomCodeState,
  roomSetState,
} from '@states/host/roomSetState';
import { selectedCompanyStockState } from '@states/participant/modalState';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useSwiper } from '../../contexts/SwiperContext';

export default function useRoomLeave({
  showToastMessage,
  initialRoomCodeCompare,
}: {
  showToastMessage: () => void;
  initialRoomCodeCompare: () => void;
}) {
  const { allowSlidePrev } = useSwiper();
  const { sendMessage, isConnect } = useSocket();
  const [roomCode, setPersistRoomCode] = useRecoilState(roomCodeState);

  const resetSelectedCompanyStockState = useResetRecoilState(
    selectedCompanyStockState
  );
  const resetRoomSet = useResetRecoilState(roomSetState);
  const resetCurrentRound = useResetRecoilState(currentRoundState);

  const initialRoomState = () => {
    resetSelectedCompanyStockState();
    resetRoomSet();
    resetCurrentRound();
  };

  const leaveRoom = async () => {
    if (!isConnect) return;
    if (roomCode) {
      const result = await leaveGameRoom(roomCode);
      if (result.status !== 200) {
        console.error('오류 발생. 게임방에서 나가지 못했습니다.');
        return;
      }
      sendMessage(`/app/room`, { data: { roomCode }, type: 'ROOM_LEAVE' });
    }
    initialRoomState();
  };

  const handleClickBackButton = () => {
    leaveRoom();
    initialRoomCodeCompare();
    setPersistRoomCode(null);
    allowSlidePrev();
    showToastMessage();
  };

  return {
    handleClickBackButton,
  };
}
