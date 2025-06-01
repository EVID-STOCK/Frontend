import { useEffect, useRef, useState } from 'react';
import { defaultAlert } from '@utils/customAlert';
import { participateGameRoom } from '@apis/api/game';
import { roomCodeState } from '@states/host/roomSetState';
import { useRecoilState } from 'recoil';
import ProfileSelector from '../components/ProfileSelector';
import { SwiperRef } from 'swiper/react';
import { useSocket } from '@contexts/SocketContext';
import * as S from './styles';

const PROFILE_LIST: Record<number, string> = {
  0: '/images/profile-blue-1.png',
  1: '/images/profile-blue-2.png',
  2: '/images/profile-blue-3.png',
};

interface UserFormProps {
  swiperRef: React.MutableRefObject<SwiperRef | null>;
  setAllowSlideNext: React.Dispatch<React.SetStateAction<boolean>>;
  pwCompare: {
    text: string;
    state: boolean | undefined;
  };
  setPwCompare: React.Dispatch<
    React.SetStateAction<{
      text: string;
      state: boolean | undefined;
    }>
  >;
}

export default function UserForm({
  swiperRef,
  setAllowSlideNext,
  pwCompare,
  setPwCompare,
}: UserFormProps) {
  const { socket, subscribe, sendMessage } = useSocket();
  const [name, setName] = useState({ value: '', state: false });
  const [roomCode, setRoomCode] = useState({ value: '', state: false });
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [profileSelectorVisible, setProfileSelectorVisible] = useState(true);
  const [persistRoomCode, setPersistRoomCode] = useRecoilState(roomCodeState);
  const profileRef = useRef<HTMLImageElement>(null);

  // 이름 입력칸
  const handleOnNameKeyPress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.value.length === 0) {
      defaultAlert('이름을 입력하지 않았습니다.');
      return;
    }
    setName((prev) => ({ ...prev, state: true })); // 이름 설정 완료 상태로 설정
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
      // 일치하는 방을 찾고 유저를 해당 방에 참여시킴.
      const result = await participateGameRoom(roomCode.value, {
        userName: name.value,
        profileNum: selectedProfile,
      });
      if (result.status === 200) {
        setPersistRoomCode(roomCode.value);
        setAllowSlideNext(true);
        setPwCompare({
          text: '패스워드가 일치합니다.',
          state: true,
        });
      } else if (result.status === 404) {
        setRoomCode((prev) => ({ ...prev, state: false }));
        setPwCompare({
          text: '잘못된 입장코드 입니다.',
          state: false,
        });
        return;
      } else {
        setRoomCode((prev) => ({ ...prev, state: false }));
        return;
      }
    }, 1000);
  };

  const handleProfileClick = () => {
    setProfileSelectorVisible(true);
  };

  // pw일치여부 바뀔때마다 확인해서 비교
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (pwCompare.state === true) {
      timeoutId = setTimeout(() => {
        swiperRef?.current?.swiper?.slideNext();
      }, 2000);
    }

    // 슬라이드 오류 해결을 위해 필요
    return () => {
      clearTimeout(timeoutId);
    };
  }, [pwCompare.state]);

  useEffect(() => {
    const handleConnect = () => {
      sendMessage('/app/room/participants', { roomCode: persistRoomCode });
    };
    subscribe(`/topic/room/connect/complete/${persistRoomCode}`, handleConnect);
  }, [socket, persistRoomCode]);

  useEffect(() => {
    if (persistRoomCode) return;
    setRoomCode({ value: '', state: false });
  }, [persistRoomCode]);

  return (
    <S.SecondPage $state={name.state} $codeVisible={name.state}>
      <S.SetMyInfo $nameState={name.state}>
        <div>
          <img
            ref={profileRef}
            src={PROFILE_LIST[selectedProfile]}
            onClick={handleProfileClick}
          />
          <img
            src="/icons/modify-profile-icon.svg"
            onClick={handleProfileClick}
          />
        </div>
        <S.NameForm $nameState={name.state} onSubmit={handleOnNameKeyPress}>
          <div>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              readOnly={name.state}
              maxLength={5}
              onClick={() => {
                if (name.state) {
                  setName((prev) => ({ ...prev, state: false }));
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName((prev) => ({ ...prev, value: e.target.value }));
              }}
            />
            <img src="icons/edit-icon.svg" />
          </div>
          <button type="submit" hidden />
        </S.NameForm>
        <S.RoomCodeForm
          $nameState={name.state}
          $codeState={roomCode.state}
          onSubmit={handleOnCodeKeyPress}
        >
          <input
            type="text"
            placeholder="입장 코드를 입력하세요"
            disabled={!name.state ? !roomCode.state : roomCode.state}
            maxLength={6}
            value={roomCode.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setRoomCode((prev) => ({ ...prev, value: e.target.value }));
            }}
          />
          <button type="submit" hidden />
        </S.RoomCodeForm>
      </S.SetMyInfo>

      <S.Notice $state={pwCompare.state}>{pwCompare.text}</S.Notice>

      <ProfileSelector
        profileRef={profileRef}
        visible={profileSelectorVisible}
        setVisible={setProfileSelectorVisible}
        setSelectedProfile={setSelectedProfile}
      />
    </S.SecondPage>
  );
}
