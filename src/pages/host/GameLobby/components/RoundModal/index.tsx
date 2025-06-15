import ProgressModal from '../ProgressModal';
import RoundEndModal from '../RoundEndModal';
import useManageRound from './useManageRound';

export default function RoundModal() {
  const { modalState, timer, setTimer } = useManageRound();
  return (
    <>
      {modalState('hostGameModal') === 'game' ? (
        <ProgressModal timer={timer} />
      ) : (
        <RoundEndModal setTimer={setTimer} />
      )}
    </>
  );
}
