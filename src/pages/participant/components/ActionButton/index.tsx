import styled from 'styled-components';

export default function ActionButton({
  value,
  onClick,
}: {
  value: string;
  onClick: () => void;
}) {
  return <AcitonButtonWrapper onClick={onClick}>{value}</AcitonButtonWrapper>;
}

const AcitonButtonWrapper = styled.button`
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
`;
