import styled from 'styled-components';

export const LineChartContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 20px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  position: absolute;
  right: 20px;
  top: 5px;
  font-size: 1.1rem;
`;

export const Notice = styled.p`
  padding-top: 10px;
  font-size: 1.1rem;
  color: #686868;
  align-self: self-end;
`;
