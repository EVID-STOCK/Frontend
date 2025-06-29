import React from 'react';
import * as S from './styles';

function Keypad({
  setStock,
}: {
  setStock: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <S.KeyPadContainer>
      <S.Line>
        {new Array(3).fill(0).map((_, index) => {
          return (
            <button
              key={index}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setStock(
                  (pre) => pre + String((e.target as HTMLElement).innerText)
                );
              }}
            >
              {index + 1}
            </button>
          );
        })}
      </S.Line>
      <S.Line>
        {new Array(3).fill(0).map((_, index) => {
          return (
            <button
              key={index}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setStock(
                  (pre) => pre + String((e.target as HTMLElement).innerText)
                );
              }}
            >
              {index + 4}
            </button>
          );
        })}
      </S.Line>
      <S.Line>
        {new Array(3).fill(0).map((_, index) => {
          return (
            <button
              key={index}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setStock(
                  (pre) => pre + String((e.target as HTMLElement).innerText)
                );
              }}
            >
              {index + 7}
            </button>
          );
        })}
      </S.Line>
      <S.Line>
        <button></button>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            // if (!zeroAvailable) return; // 0주는 입력할 수 없도록
            setStock((pre) => {
              if (pre.length === 0) return pre;
              return pre + String((e.target as HTMLElement).innerText);
            });
          }}
        >
          0
        </button>
        <button
          onClick={() => {
            setStock((pre) => pre.slice(0, -1));
          }}
        >
          <img src="/icons/delete-icon.svg" />
        </button>
      </S.Line>
    </S.KeyPadContainer>
  );
}

export default React.memo(Keypad);
