import { shimmer } from '@styles/animation';
import styled from 'styled-components';

function StockSkeleton() {
  return (
    <StockSkeletonWrapper>
      {new Array(10).fill(0).map((_) => {
        return <Skeleton />;
      })}
    </StockSkeletonWrapper>
  );
}

const StockSkeletonWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Skeleton = styled.div`
  width: 100%;
  height: 5.5rem;
  border-radius: 4px;
  background: linear-gradient(135deg, #d1d1d1 20%, #e9e9e9 60%, #d1d1d1 70%);
  background-size: 500% auto;
  animation: ${shimmer} 1.5s infinite linear;
`;

export default StockSkeleton;
