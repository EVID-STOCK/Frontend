import { useCallback } from 'react';
import { defaultAlert, networkErrorAlert } from '@utils/customAlert';
import { updateRoomInfo } from '@apis/api/game';
import { RoomSet } from 'types/room';
import { useRecoilValue } from 'recoil';
import { roomSetState } from '@states/host/roomSetState';
import { useLocation } from 'react-router-dom';
import { useSocket } from '@contexts/SocketContext';
import useModalState from '@hooks/useModalState';

export default function useGameStart(participantLength: number) {
  const { state } = useLocation();
  const { socket, sendMessage } = useSocket();
  const roomSetting = useRecoilValue(roomSetState);
  const { openModal } = useModalState();

  const handleClickGameStartButton = useCallback(async () => {
    if (
      !roomSetting.round_num ||
      !roomSetting.time_limit ||
      !roomSetting.seed
    ) {
      defaultAlert('입력하지 않은 값이 있습니다');
      return;
    }
    if (participantLength < 2) {
      defaultAlert('인원이 부족합니다');
      return;
    }
    const result = await updateRoomInfo(state.roomPW, roomSetting as RoomSet);
    if (result.status === 200) {
      if (!socket) {
        networkErrorAlert('연결이 불안정합니다. 다시 시도해주세요');
        return;
      }
      openModal('hostGameModal', 'game');
      sendMessage('/app/game/start', { roomCode: state.roomPW }); // 게임 시작
      sendMessage('/app/game/start-timer', { roomCode: state.roomPW }); // 타이머 시작
    } else if (result.status === 404) {
      networkErrorAlert('게임방이 존재하지 않습니다');
    }
  }, [roomSetting, participantLength]);

  return { handleClickGameStartButton };
}
