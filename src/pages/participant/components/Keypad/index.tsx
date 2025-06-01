import React from 'react';
import styled from 'styled-components';

function Keypad({
  setStock,
}: {
  setStock: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <KeyPad>
      <Line>
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
      </Line>
      <Line>
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
      </Line>
      <Line>
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
      </Line>
      <Line>
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
      </Line>
    </KeyPad>
  );
}

export default React.memo(Keypad);

const KeyPad = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 611px);
  min-height: 269px;
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 3);
    height: 100%;
    min-height: 67.25px;
    color: #000000;
    text-align: center;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background: none;
    cursor: pointer;
  }
`;
