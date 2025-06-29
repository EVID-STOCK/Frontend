import { useCallback } from 'react';
import { defaultAlert, networkErrorAlert } from '@utils/customAlert';
import { updateRoomSettings } from '@apis/api/game';
import { RoomSet } from 'types/room';
import { useRecoilValue } from 'recoil';
import { roomSetState } from '@states/host/roomSetState';
import { useLocation } from 'react-router-dom';
import { useSocket } from '@contexts/SocketContext';
import useModalState from '@hooks/useModalState';

export default function useGameStart(participantLength: number) {
  const { state } = useLocation();
  const { sendMessage, isConnect } = useSocket();
  const roomSetting = useRecoilValue(roomSetState);
  const { openModal } = useModalState();

  const handleClickGameStartButton = useCallback(async () => {
    if (!roomSetting.roundNum || !roomSetting.timeLimit || !roomSetting.seed) {
      defaultAlert('입력하지 않은 값이 있습니다');
      return;
    }
    if (participantLength < 2) {
      defaultAlert('인원이 부족합니다');
      return;
    }
    const result = await updateRoomSettings(
      state.roomPW,
      roomSetting as RoomSet
    );
    if (result.status === 200) {
      if (!isConnect) {
        networkErrorAlert('연결이 불안정합니다. 다시 시도해주세요');
        return;
      }
      openModal('hostGameModal', 'game');
      sendMessage(`/app/game`, {
        data: { roomCode: state.roomPW },
        type: 'GAME_START',
      });
      sendMessage(`/app/game`, {
        data: { roomCode: state.roomPW },
        type: 'TIMER_START',
      });
    } else if (result.status === 404) {
      networkErrorAlert('게임방이 존재하지 않습니다');
    }
  }, [roomSetting, participantLength]);

  return { handleClickGameStartButton };
}
