import styled from 'styled-components';

export default function ModalLayout({
  visible,
  onClick,
  children,
}: {
  visible: boolean;
  onClick:
    | ((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | (() => void);
  children: React.ReactNode;
}) {
  return (
    <ModalLayoutContainer $visible={visible} onClick={onClick}>
      {children}
    </ModalLayoutContainer>
  );
}

const ModalLayoutContainer = styled.div<{ $visible: boolean }>`
  display: ${(props) => (props.$visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.36);
  position: absolute;
  z-index: 3;

  @media screen and (max-width: 768px) {
    position: fixed;
  }
`;
