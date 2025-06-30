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
import { useLeaveRoomQuery } from './useLeaveRoomQuery';

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

  const { mutate: leaveRoomMutate, isSuccess, isError } = useLeaveRoomQuery();

  const initialRoomState = () => {
    resetSelectedCompanyStockState();
    resetRoomSet();
    resetCurrentRound();
  };

  const leaveRoom = async () => {
    if (!isConnect) return;
    if (roomCode) {
      leaveRoomMutate({ roomPW: roomCode });
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
