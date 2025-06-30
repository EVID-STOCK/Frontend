import { useSocket } from '@contexts/SocketContext';
import { roomCodeState as persistRoomCodeState } from '@states/host/roomSetState';
import { roomCodeCompareState, roomCodeState } from '../states/roomCodeState';
import { defaultAlert } from '@utils/customAlert';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedProfileState } from '../states/profileState';
import { nameState } from '../states/nameState';
import { useSwiper } from '../../contexts/SwiperContext';
import { useJoinRoomQuery } from './useJoinRoomQuery';

export default function useSetRoomCode() {
  const { slideNext, allowSlideNext } = useSwiper();
  const [roomCode, setRoomCode] = useRecoilState(roomCodeState);
  const [name] = useRecoilState(nameState);
  const [selectedProfile] = useRecoilState(selectedProfileState);
  const {
    mutate: joinRoomMutate,
    isSuccess,
    isError,
    error,
  } = useJoinRoomQuery();

  const [persistRoomCode, setPersistRoomCode] =
    useRecoilState(persistRoomCodeState);
  const { sendMessage, connectSocket, isConnect } = useSocket();
  const [roomCodeCompare, setRoomCodeCompare] =
    useRecoilState(roomCodeCompareState);

  const initialRoomCodeCompare = () => {
    setRoomCodeCompare({
      text: '프로필을 눌러 설정해주세요.',
      state: undefined,
    });
  };

  const handleSuccessParticipate = async () => {
    setPersistRoomCode(roomCode.value);
    await connectSocket(roomCode.value);
    allowSlideNext();
    setRoomCodeCompare({
      text: '패스워드가 일치합니다.',
      state: true,
    });
    sendMessage(`/app/room`, {
      data: { roomCode: roomCode.value },
      type: 'ROOM_JOIN',
    });
  };

  const handleWrongRoomCode = () => {
    handleFailParticipate();
    setRoomCodeCompare({
      text: '잘못된 입장코드 입니다.',
      state: false,
    });
  };

  const handleFailParticipate = () => {
    setRoomCode((prev) => ({ ...prev, state: false }));
  };

  // 입장코드 입력칸
  const handleOnCodeKeyPress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomCode.value.length === 0) {
      defaultAlert('입장 코드를 입력하지 않았습니다.');
      return;
    }
    setRoomCode((prev) => ({ ...prev, state: true }));
    setTimeout(async () => {
      joinRoomMutate({
        roomPW: roomCode.value,
        studentInfo: {
          userName: name.value,
          profileNum: selectedProfile,
        },
      });
    }, 1000);
  };

  useEffect(() => {
    if (!isSuccess) return;

    (async () => {
      await handleSuccessParticipate();
    })();
  }, [isSuccess, isConnect]);

  useEffect(() => {
    if (!isError) return;

    const status = error?.response?.status;
    if (status === 404) {
      handleWrongRoomCode();
    } else {
      handleFailParticipate();
    }
  }, [isError, error]);

  useEffect(() => {
    if (persistRoomCode) return;
    setRoomCode({ value: '', state: false });
  }, [persistRoomCode]);

  // pw일치여부 바뀔때마다 확인해서 비교
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (roomCodeCompare.state === true) {
      timeoutId = setTimeout(() => {
        const newSlideNext = slideNext;
        newSlideNext();
      }, 2000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [roomCodeCompare.state, slideNext]);

  return {
    roomCode,
    setRoomCode,
    initialRoomCodeCompare,
    handleOnCodeKeyPress,
    roomCodeCompare,
  };
}
