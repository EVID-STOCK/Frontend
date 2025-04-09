import { styled } from 'styled-components';

export const SelectLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  @media screen and (max-width: 768px) {
    gap: 5px;
  }
`;

export const Title = styled.h3`
  display: block;
  color: #ffffff;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 70px;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  position: relative;
`;

export const SelectBtn = styled.button<{ $visible: boolean }>`
  display: flex;
  border-radius: 7px;
  overflow: hidden;
  background-color: #a7c2e4;
  color: #ffffff;
  cursor: pointer;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 16px;
    width: 132px;
    height: 30px;
    color: #ffffff;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    & > p {
      text-align: left;
      width: 100%;
      white-space: nowrap;
    }

    // select 화살표
    & > img {
      transform: rotate(${(props) => (props.$visible ? '180deg' : '0deg')});
      transition: all, 0.5s;
    }
  }

  @media screen and (max-width: 768px) {
    & > div {
      font-size: 1.5rem;

      & > img {
        width: 15px;
      }
    }
  }
`;

export const SelectOptions = styled.div<{ $visible: boolean }>`
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  height: auto;
  max-height: 170px;
  list-style: none;
  background-color: #a7c2e4;
  border-radius: 7px;
  position: absolute;
  top: 40px;
  z-index: 1;
  opacity: ${(props) => (props.$visible ? '1' : '0')};
  transition: all, 0.5s;
  pointer-events: ${(props) => (props.$visible ? 'all' : 'none')};
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Options = styled.ul<{ $visible: boolean }>`
  & > li {
    width: 132px;
    padding: 4px 16px;
    color: #ffffff;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 7px;
      opacity: ${(props) => (props.$visible ? '1' : '0.7')};
      transition: all, 0.5s;
    }
  }

  @media screen and (max-width: 768px) {
    & > li {
      font-size: 1.5rem;
    }
  }
`;
