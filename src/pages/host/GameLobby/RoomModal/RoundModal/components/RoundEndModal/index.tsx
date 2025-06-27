import * as S from './styles';

export default function RoundEndModal({
  onClickResultButton,
  onClickNextRoundButton,
}: {
  onClickResultButton: () => void;
  onClickNextRoundButton: () => void;
}) {
  return (
    <S.RoundEndModalContainer>
      <p>라운드 종료</p>
      <S.ActionButtonWrapper>
        <button onClick={onClickResultButton}>결과 조회</button>
        <button onClick={onClickNextRoundButton}>다음 라운드</button>
      </S.ActionButtonWrapper>
    </S.RoundEndModalContainer>
  );
}
