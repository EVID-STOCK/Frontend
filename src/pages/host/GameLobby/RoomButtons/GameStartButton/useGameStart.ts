import { useCallback, useEffect } from 'react';
import { defaultAlert, networkErrorAlert } from '@utils/customAlert';
import { useRecoilValue } from 'recoil';
import { roomSetState } from '@states/host/roomSetState';
import { useLocation } from 'react-router-dom';
import { useSocket } from '@contexts/SocketContext';
import useModalState from '@hooks/useModalState';
import { useUpdateRoomSettingsQuery } from './useUpdateRoomSettingsQuery';

export default function useGameStart(participantLength: number) {
  const { state } = useLocation();
  const { sendMessage, isConnect } = useSocket();
  const roomSetting = useRecoilValue(roomSetState);
  const { openModal } = useModalState();
  const {
    mutate: updateRoomSettingsMutate,
    isSuccess,
    isError,
    error,
  } = useUpdateRoomSettingsQuery();

  const handleClickGameStartButton = useCallback(async () => {
    if (!roomSetting.roundNum || !roomSetting.timeLimit || !roomSetting.seed) {
      defaultAlert('입력하지 않은 값이 있습니다');
      return;
    }
    if (participantLength < 2) {
      defaultAlert('인원이 부족합니다');
      return;
    }

    updateRoomSettingsMutate({ roomPW: state.roomPW, roomInfo: roomSetting });
  }, [roomSetting, participantLength]);

  useEffect(() => {
    if (!isSuccess) return;

    if (!isConnect) {
      networkErrorAlert('연결이 불안정합니다. 다시 시도해주세요');
      return;
    }
    openModal('hostGameModal', 'game');
    sendMessage('/app/game', {
      data: { roomCode: state.roomPW },
      type: 'GAME_START',
    });
    sendMessage('/app/game', {
      data: { roomCode: state.roomPW },
      type: 'TIMER_START',
    });
  }, [isSuccess, isConnect, openModal, sendMessage, state.roomPW]);

  useEffect(() => {
    if (!isError) return;

    const status = error?.response?.status;
    if (status === 404) {
      networkErrorAlert('게임방이 존재하지 않습니다');
    }
    console.error('에러:', error);
  }, [isError, error]);

  return { handleClickGameStartButton };
}
