import React, { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { navbarState } from '@states/participant/navbarState';
import useSlidingPanel from '@hooks/useSlidingPanel';
import { selectedCompanyStockState } from '@states/participant/modalState';
import * as S from './styles';

interface ParticipantHeaderProps {
  navbar?: boolean;
}

function ParticipantHeader({ navbar }: ParticipantHeaderProps) {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useRecoilState(navbarState);
  const { setSlidingState, slidingState } = useSlidingPanel();
  const companyStock = useRecoilValue(selectedCompanyStockState); // 모달에 있는 값들

  return (
    <S.HeaderContainer>
      <S.HeaderLogo>
        <img src="/images/headerLogo.svg" />
      </S.HeaderLogo>

      {navbar ? (
        <S.Navbar $state={slidingState} $selected={selectedNav}>
          <button
            onClick={() => {
              startTransition(() => {
                setSelectedNav('wallet');
                setSlidingState('wallet');
              });
            }}
          >
            지갑
          </button>
          <button
            onClick={() => {
              startTransition(() => {
                setSelectedNav('stock');
                setSlidingState('stock');
              });
            }}
          >
            종목
          </button>
          <button
            onClick={() => {
              startTransition(() => {
                setSelectedNav('news');
                setSlidingState('stock');
              });
            }}
          >
            뉴스
          </button>
        </S.Navbar>
      ) : (
        <S.GoBackWrapper>
          <img
            src="/icons/arrow-left_icon.svg"
            onClick={() => {
              navigate(-1);
            }}
          />
          <p>{companyStock.companyName}</p>
        </S.GoBackWrapper>
      )}
    </S.HeaderContainer>
  );
}

export default React.memo(ParticipantHeader);
