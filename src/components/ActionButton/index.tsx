import React from 'react';
import styled from 'styled-components';

function ActionButton({
  value,
  padding,
  borderRadius,
  fontSize,
  onClick,
  children,
}: {
  value?: string;
  padding: number;
  borderRadius: number;
  fontSize: number;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <ActionButtonStyle
      $padding={padding}
      $borderRadius={borderRadius}
      $fontSize={fontSize}
      onClick={onClick}
    >
      {value}
      {children}
    </ActionButtonStyle>
  );
}

export default React.memo(ActionButton);

export const ActionButtonStyle = styled.button<{
  $padding: number;
  $borderRadius: number;
  $fontSize: number;
}>`
  width: 100%;
  color: #ffffff;
  font-size: ${(props) => `${props.$fontSize}rem`};
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: ${(props) => `${props.$padding}rem`};
  border-radius: ${(props) => `${props.$borderRadius}px`};
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  -moz-transition: background, 0.3s;
  -o-transition: background, 0.3s;
  -webkit-transition: background, 0.3s;
  transition: background, 0.3s;
  cursor: pointer;

  &:focus {
    background-color: #a7c2e4;
  }

  &:hover {
    background: #a7c2e4;
  }

  @media screen and (max-width: 768px) {
    font-size: ${(props) => `${props.$fontSize - 0.3}rem`};
  }
`;
