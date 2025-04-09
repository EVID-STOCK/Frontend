import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles';
import Header from '@components/Header';
import { RoomSet, Student } from 'types/room';
import ActionButton from '@components/ActionButton';
import RoomParticipant from './RoomParticipant';
import RoomSetting from './RoomSetting';
import ModalLayout from './components/ModalLayout';
import { useLocation } from 'react-router-dom';
import useModalState from '@hooks/useModalState';
import { useSocket } from '@contexts/SocketContext';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { roomCodeState, roomSetState } from '@states/host/roomSetState';
import { defaultAlert, networkErrorAlert } from '@utils/customAlert';
import { updateRoomInfo } from '@apis/api/game';
import RoundModal from './components/RoundModal';
import SocketLoading from '@components/SocketLoading';

export default function GameLobby() {
  const { state } = useLocation();
  const pwRef = useRef<HTMLDivElement>(null);
  const { socket, sendMessage, isConnect } = useSocket();
  const [participants, setParticipants] = useState<Student[]>([]);
  const { openModal, closeModal, state: modalState, isOpen } = useModalState();
  const roomSetting = useRecoilValue(roomSetState);
  const setRoomCode = useSetRecoilState(roomCodeState);

  const handleClickModalBackground = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (
      // 현재 클릭한 버튼이 패스워드일 경우에만, 바탕을 클릭했을 때 사라지도록 설정
      modalState('hostGameModal') === 'password' &&
      (!pwRef.current || !pwRef.current.contains(e.target as HTMLDivElement))
    ) {
      closeModal('hostGameModal');
    }
  };

  const handleClickPasswordButton = () => {
    openModal('hostGameModal', 'password');
  };

  const handleClickGameStartButton = useCallback(async () => {
    if (
      !roomSetting.round_num ||
      !roomSetting.time_limit ||
      !roomSetting.seed
    ) {
      defaultAlert('입력하지 않은 값이 있습니다');
      return;
    }
    if (participants.length < 2) {
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
  }, [roomSetting, participants]);

  useEffect(() => {
    if (state && state.roomPW && socket) {
      setRoomCode(state.roomPW);
      sendMessage('/app/room/connect', { roomCode: state.roomPW });
      sendMessage('/app/room/participants', { roomCode: state.roomPW });
    }
  }, [state, socket]);

  return (
    <S.GameLobbyContainer>
      {!isConnect ? <SocketLoading /> : null}
      <ModalLayout
        onClick={handleClickModalBackground}
        visible={isOpen('hostGameModal')}
      >
        {modalState('hostGameModal') === 'password' ? (
          <S.Password ref={pwRef}>
            <p>{state.roomPW}</p>
          </S.Password>
        ) : null}
        {modalState('hostGameModal') === 'game' ||
        modalState('hostGameModal') === 'gameover' ? (
          <RoundModal />
        ) : null}
      </ModalLayout>

      <Header />

      <S.GameLobbyMain>
        <S.ContentWrapper>
          <RoomSetting />
          <RoomParticipant
            participants={participants}
            setParticipants={setParticipants}
          />
        </S.ContentWrapper>

        <S.ButtonWrapper>
          <ActionButton
            value="PASSWORD"
            padding={2}
            borderRadius={25}
            fontSize={3.2}
            onClick={handleClickPasswordButton}
          />
          <ActionButton
            value="GAME START"
            padding={2}
            borderRadius={25}
            fontSize={3.2}
            onClick={handleClickGameStartButton}
          />
        </S.ButtonWrapper>
      </S.GameLobbyMain>
    </S.GameLobbyContainer>
  );
}
