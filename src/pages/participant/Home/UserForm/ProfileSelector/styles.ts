import styled from 'styled-components';

export const ProfileSelectorContainer = styled.section<{ $visible: boolean }>`
  width: 100%;
  height: 24rem;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  z-index: 2;
  border-radius: 16px 16px 0 0;
  transform: ${(props) =>
    props.$visible ? 'translateY(-0%)' : 'translateY(100%)'};
  transition: ${(props) =>
    props.$visible ? 'transform 0.6s ease-out' : 'transform 0.6s ease-in'};
`;

export const ProfileList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3.2rem 1.6rem 3.5rem 1.6rem;
  gap: 1rem;
  overflow-x: auto;

  & > img {
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    cursor: pointer;
  }
`;

export const SlidingDoor = styled.div`
  height: 72.5px;
  border-bottom: 0.5px solid rgba(60, 60, 67, 0.18);
  position: relative;
  display: flex;
  justify-content: center;

  & > span {
    display: inline-block;
    width: 13.4rem;
    height: 5px;
    border-radius: 100px;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 1.2rem;
  }
`;
