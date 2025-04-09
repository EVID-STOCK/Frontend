import React from 'react';
import Profile from './Profile';
import AssetInfo from './AssetInfo';
import StockList from './StockList';
import SlidingPanel from '../components/SlidingPanel';
import TradingSlidingPanel from '../TradeSlidingPanel';
import CustomSuspense from '@components/CustomSuspense';

function Wallet() {
  return (
    <>
      <CustomSuspense>
        <Profile />
        <AssetInfo />
        <StockList />
      </CustomSuspense>
      <SlidingPanel>
        <TradingSlidingPanel />
      </SlidingPanel>
    </>
  );
}

export default React.memo(Wallet);
