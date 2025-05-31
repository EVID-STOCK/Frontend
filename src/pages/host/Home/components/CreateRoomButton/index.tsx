import styled from 'styled-components';
import { getGameRoomPassword } from '@apis/api/game';
import { useNavigate } from 'react-router-dom';

function CreateRoomButton() {
  const navigate = useNavigate();

  const onClickCreateRoomButton = async () => {
    const roomPW = await getGameRoomPassword();
    if (roomPW.status === 200) {
      navigate('/host/room/wait', { state: { roomPW: roomPW.data.roomCode } });
    }
  };

  return (
    <CreateRoomButtonWrapper onClick={onClickCreateRoomButton}>
      <img src="/icons/add_icon.svg" alt="방만들기 아이콘" />
      <p>Create New Room</p>
    </CreateRoomButtonWrapper>
  );
}

const CreateRoomButtonWrapper = styled.button`
  background: none;
  align-self: center;
  cursor: pointer;

  display: flex;
  height: 5.6rem;
  padding: 1.6rem 3.2rem;
  align-items: center;
  gap: 2rem;
  border-radius: 3.8rem;
  background-color: #ffffff;
  color: #000000;
  -moz-transition:
    background-color 0.5s,
    color 0.5s;
  -o-transition:
    background-color 0.5s,
    color 0.5s;
  -webkit-transition:
    background-color 0.5s,
    color 0.5s;
  transition:
    background-color 0.5s,
    color 0.5s;

  & > p {
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
  }

  &:hover {
    color: #ffffff;
    background-color: #a7c2e4;
  }

  &:hover > img {
    filter: brightness(600%);
  }

  & > img {
    transition: filter, 0.5s;
  }

  @media screen and (max-width: 768px) {
    & > div {
      width: 100%;
      height: auto;
      max-width: 27.4rem;
      padding: 1rem 2rem;

      & > p {
        font-size: 1.5rem;
        white-space: nowrap;
      }
    }
  }
`;

export default CreateRoomButton;
