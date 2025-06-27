import * as S from './styles';
import React, { forwardRef } from 'react';

type PasswordModalProps = {
  roomCode: string;
};

const PasswordModal = forwardRef<HTMLDivElement, PasswordModalProps>(
  ({ roomCode }, ref) => {
    return (
      <S.Password ref={ref}>
        <p>{roomCode}</p>
      </S.Password>
    );
  }
);

export default React.memo(PasswordModal);
