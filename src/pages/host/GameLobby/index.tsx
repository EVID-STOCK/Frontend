import React, { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import Header from '@components/Header';
import { Student } from 'types/room';
import ActionButton from '@components/ActionButton';
import RoomParticipant from './RoomParticipant';
import RoomSetting from './RoomSetting';
import ModalLayout from './components/ModalLayout';
import { useLocation } from 'react-router-dom';
import useModalState from '@hooks/useModalState';
import { useSocket } from '@contexts/SocketContext';
import { useSetRecoilState } from 'recoil';
import { roomCodeState } from '@states/host/roomSetState';
import RoundModal from './components/RoundModal';
import SocketLoading from '@components/SocketLoading';
import GameStartButton from './components/GameStartButton';

export default function GameLobby() {
  const { state } = useLocation();
  const pwRef = useRef<HTMLDivElement>(null);
  const { socket, sendMessage, isConnect } = useSocket();
  const [participants, setParticipants] = useState<Student[]>([]);
  const { openModal, closeModal, state: modalState, isOpen } = useModalState();
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

  useEffect(() => {
    if (state?.roomPW && socket) {
      setRoomCode(state.roomPW);
      sendMessage('/app/room/connect', { roomCode: state.roomPW });
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
          <GameStartButton participantLength={participants.length} />
        </S.ButtonWrapper>
      </S.GameLobbyMain>
    </S.GameLobbyContainer>
  );
}
