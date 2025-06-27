import styled from 'styled-components';
import CsvDownloadButton from 'react-json-to-csv';

export const ActionButtonWrapper = styled.div`
  display: flex;
  gap: 3rem;
`;

export const StyledCsvDownloadButton = styled(CsvDownloadButton)`
  width: 100%;
  padding: 1.2rem;
  border-radius: 25px;
  font-size: 2rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.4);
  color: #ffffff;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;

  &:hover {
    background: #a7c2e4;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.7rem;
  }
`;
