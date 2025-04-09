import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@components/Footer';
import { deleteGameRoom, getGameRoomPassword } from '@apis/api/game';
import {
  currentRoundState,
  gameResultConditionState,
  roomSetState,
  roomCodeState,
} from '@states/host/roomSetState';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import * as S from './styles';
import UserProfile from '@components/UserProfile';
import { modalState } from '@states/participant/modalState';

function HostHome() {
  const navigate = useNavigate();
  const resetResultCondition = useResetRecoilState(gameResultConditionState);
  const resetRoomSet = useResetRecoilState(roomSetState);
  const resetcurrentRound = useResetRecoilState(currentRoundState);
  const resetModals = useResetRecoilState(modalState);
  const roomCode = useRecoilValue(roomCodeState);

  const onClickCreateRoomButton = async () => {
    const roomPW = await getGameRoomPassword();
    if (roomPW.status === 200) {
      navigate('/host/room/wait', { state: { roomPW: roomPW.data.roomCode } });
    }
  };
  const deleteRoom = async () => {
    if (!roomCode) return;
    await deleteGameRoom(roomCode);
  };

  useEffect(() => {
    // socket.removeAllListeners();
    if (!roomCode) return;

    // socket.emit('stopTimer', roomCode);
    // socket.emit('deleteRoom', roomCode);
    deleteRoom();

    resetModals();
    resetResultCondition();
    resetRoomSet();
    resetcurrentRound();
  }, []);

  return (
    <S.HomeContainer>
      <UserProfile />
      {/* <S.BackgroundImage src="/images/mainBackgroundImage.svg" /> */}
      <S.Main>
        <S.Logo src="/images/mainLogo.svg" />
        <p>
          학생들도 주식에 쉽게 다가갈 수 있는
          <br />
          모의주식 서비스 E - STOCK 입니다.
        </p>
        <S.CreateRoomBtn onClick={onClickCreateRoomButton}>
          <div>
            <img src="/icons/add_icon.svg" alt="방만들기 아이콘" />
            <p>Create New Room</p>
          </div>
        </S.CreateRoomBtn>
      </S.Main>
      <Footer />
    </S.HomeContainer>
  );
}

export default HostHome;
