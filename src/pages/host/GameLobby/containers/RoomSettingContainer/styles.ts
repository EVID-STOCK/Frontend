import styled from 'styled-components';

export const ListContainer = styled.div`
  height: calc(100vh - 88px);
  min-height: 800px;
  max-height: 1000px;

  @media screen and (max-width: 768px) {
    height: auto;
    min-height: unset;
    max-height: unset;
  }
`;

export const RoomSettingContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.9rem;
  position: absolute;
  left: 3.7rem;
  top: 6.5rem;
  z-index: 1;

  @media screen and (max-width: 768px) {
    position: static;
  }
`;

export const ListImage = styled.img`
  align-self: center;
  position: absolute;
  bottom: 9.1rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
