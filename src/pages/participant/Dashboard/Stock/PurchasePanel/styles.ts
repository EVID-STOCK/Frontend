import styled from 'styled-components';

export const PurchasePanelContainer = styled.section<{ $visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60rem;
  background-color: #ffffff;
  padding-bottom: 7.2rem;
  border-radius: 16px 16px 0 0;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
  transform: ${(props) =>
    props.$visible ? 'translateY(-0%)' : 'translateY(100%)'};
  transition: ${(props) =>
    props.$visible ? 'transform 0.5s ease-out' : 'transform 0.5s ease-in'};
  box-shadow: 0px 4px 25px 0px rgba(165, 165, 165, 0.25);

  & > span {
    display: inline-block;
    width: 134px;
    height: 5px;
    border-radius: 100px;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 12px;
  }
`;

export const CompanyWrapper = styled.div`
  width: 100%;

  & > h2 {
    color: #000000;
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    padding: 56px 0 18px 0;

    &:first-child {
      padding-left: 24px;
    }

    &:last-child {
      padding-right: 24px;
    }
  }
`;

export const StockPriceContainer = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 16px 23px;
  gap: 8px;

  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;

    & > p:first-child {
      color: #000000;
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    & > p:last-child {
      color: #000000;
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    &:nth-child(2) {
      & > p:last-child {
        color: ${(props) => props.$color};
      }
    }
  }
`;

export const NoticeWrapper = styled.p<{ $color: string }>`
  width: 100%;
  color: ${(props) => props.$color};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 16px 0 16px 24px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 37px;
  gap: 48px;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    color: #000000;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 16px 0;
    border-radius: 12px;
    cursor: pointer;
  }
`;
