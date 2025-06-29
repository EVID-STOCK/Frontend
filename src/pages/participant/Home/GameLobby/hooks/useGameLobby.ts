import { useGetParticipantsQuery } from '@hooks/queries/useParticipantsQuery';
import useRoomLeave from './useRoomLeave';
import useNoticeToast from '../../hooks/useNoticeToast';
import useSetRoomCode from '../../UserForm/hooks/useSetRoomCode';

export default function useGameLobby() {
  const { showToastMessage } = useNoticeToast();
  const { initialRoomCodeCompare } = useSetRoomCode();

  const { handleClickBackButton } = useRoomLeave({
    showToastMessage,
    initialRoomCodeCompare,
  });
  const { data: participantListData } = useGetParticipantsQuery();

  return {
    handleClickBackButton,
    participantListData,
  };
}
