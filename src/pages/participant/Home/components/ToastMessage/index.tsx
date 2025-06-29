import styled from 'styled-components';

export default function ToastMessage({ state }: { state: boolean }) {
  return (
    <ToastMessageWrapper $state={state}>
      <p>방에서 나가졌습니다.</p>
    </ToastMessageWrapper>
  );
}

const ToastMessageWrapper = styled.div<{ $state: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1d5190;
  width: 200px;
  height: 50px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 70px;
  border-radius: 30px;
  opacity: ${(props) => (props.$state ? '0.9' : '0')};
  transition: opacity 2s ease;
  z-index: 50;
  pointer-events: none;

  & > p {
    color: #ffffff;
    font-size: 1.4rem;
  }
`;
