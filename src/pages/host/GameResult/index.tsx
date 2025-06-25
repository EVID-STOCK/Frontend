import { useEffect, useState } from 'react';
import Header from '@components/Header';
import ListLayout from '@components/ListLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  currentRoundState,
  gameResultConditionState,
} from '@states/host/roomSetState';
import { useRecoilState, useRecoilValue } from 'recoil';
import { checkGameResult, updateNextRound } from '@apis/api/game';
import { networkErrorAlert } from '@utils/customAlert';
import Swal from 'sweetalert2';
import ActionButton from '@components/ActionButton';
import * as S from './styles';
import { useSocket } from '@contexts/SocketContext';
import useModalState from '@hooks/useModalState';
import Select from '@components/Select';

interface GameResultList {
  rank: number;
  profile_num: number;
  name: string;
  total_price: number;
  total_roi: number;
}

const HEADERS = ['순위', '프로필', '이름', '총 자산', '수익률'];

function GameResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [list, setList] = useState<GameResultList[]>([]); // 게임 결과 리스트
  const round = useRecoilValue(currentRoundState); // 현재 라운드
  const [condition, setCondition] = useRecoilState(gameResultConditionState); // 게임 결과 조회 조건
  const { sendMessage } = useSocket();
  const { openModal } = useModalState();

  const handleRoundSelect = (selected: string) => {
    setCondition((pre) => ({
      ...pre,
      round: Number(selected),
    }));
  };

  const handleDivisionSelect = (selected: string) => {
    const parsedSelected = selected === '자산별' ? 0 : 1;
    setCondition((pre) => ({
      ...pre,
      opt: parsedSelected,
    }));
  };

  // 게임 결과 조회하기
  const checkResult = async () => {
    const result = await checkGameResult(
      state.roomPW as string,
      condition.round as number,
      condition.opt as number
    );
    setList(result.data.data);
  };

  // 다음 라운드로 넘어가기
  const goNextRound = async () => {
    const result = await updateNextRound(state.roomPW);
    if (result.status === 200) {
      if (result.data.data.state === 'next') {
        openModal('hostGameModal', 'game');
        sendMessage(`/app/game`, {
          data: { roomCode: state.roomPW },
          type: 'TIMER_START',
        });
        navigate(-1); // 게임 대기방으로 다시 돌아감.
      } else {
        Swal.fire({
          title: '게임이 종료되었습니다.',
          text: '정말로 나가시겠습니까? 게임 결과창을 다시 볼 수 없습니다.',
          width: 600,
          imageWidth: 200,
          imageHeight: 200,
          imageUrl: '/images/error-image.png',
          showCancelButton: true,
          confirmButtonColor: '#A7C2E4',
          cancelButtonColor: '#ec7272',
          confirmButtonText: 'OK',
          cancelButtonText: '취소',
          padding: '4em 0rem 4em',
          showClass: {
            popup: 'animate__animated animate__fadeInDown',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            sendMessage(`/app/game`, {
              data: { roomCode: state.roomPW },
              type: 'GAME_END',
            });
            navigate('/', { replace: true });
          }
        });
      }
    }
    if (result.status === 500) {
      networkErrorAlert();
      return;
    }
  };

  useEffect(() => {
    // 결과조회 초기값은 round는 현재 라운드, 구분은 자산별로 설정
    setCondition({
      round,
      opt: 0,
    });
  }, [round]);

  useEffect(() => {
    checkResult();
  }, [condition]);

  return (
    <S.GameResultContainer>
      <Header />
      <S.WaitingRoomList>
        <ListLayout title="결과 조회" src="/icons/result-icon.svg">
          <S.ListTitle>
            <h3>{round}라운드 랭킹</h3>
            <div>
              <Select
                value={String(round)}
                handleOption={handleRoundSelect}
                options={new Array(round).fill(0).map((_, index) => index + 1)}
              />
              <Select
                value={condition.opt === 0 ? '자산별' : '수익별'}
                handleOption={handleDivisionSelect}
                options={['자산별', '수익별']}
              />
            </div>
          </S.ListTitle>
          <S.ResultHeader>
            <p>학생 이름</p>
            <p>총 자산</p>
            <p>수익률</p>
          </S.ResultHeader>
          <S.ResultContent>
            <table>
              <colgroup>
                <col />
                <col />
                <col />
              </colgroup>
              <tbody>
                {list &&
                  list.map((student, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {student.profile_num === 0 ? (
                            <S.Profile src="/images/profile-blue-1.png" />
                          ) : null}
                          {student.profile_num === 1 ? (
                            <S.Profile src="/images/profile-blue-2.png" />
                          ) : null}
                          {student.profile_num === 2 ? (
                            <S.Profile src="/images/profile-blue-3.png" />
                          ) : null}
                          <p>{student.name}</p>
                        </td>
                        <td>{student.total_price.toLocaleString('ko-KR')}</td>
                        <S.Roi
                          color={
                            student.total_roi > 0
                              ? 'red'
                              : student.total_roi === 0
                              ? 'black'
                              : 'blue'
                          }
                        >
                          {student.total_roi}%
                        </S.Roi>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </S.ResultContent>
        </ListLayout>
        <S.ActionButtonWrapper>
          <S.StyledCsvDownloadButton
            data={list}
            filename="게임 결과.csv"
            delimiter=","
            headers={HEADERS}
          >
            결과 저장하기
          </S.StyledCsvDownloadButton>
          <ActionButton
            value="다음 라운드"
            borderRadius={25}
            fontSize={2}
            onClick={goNextRound}
            padding={1.2}
          />
        </S.ActionButtonWrapper>
      </S.WaitingRoomList>
    </S.GameResultContainer>
  );
}

export default GameResult;
