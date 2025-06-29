import React from 'react';
import Profile from './Profile';
import AssetInfo from './AssetInfo';
import StockList from './StockList';
import SlidingPanel from '../features/SlidingPanel';
import TradingSlidingPanel from './TradeSlidingPanel';

function Wallet() {
  return (
    <>
      <>
        <Profile />
        <AssetInfo />
        <StockList />
      </>
      <SlidingPanel>
        <TradingSlidingPanel />
      </SlidingPanel>
    </>
  );
}

export default React.memo(Wallet);
