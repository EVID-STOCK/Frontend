import React from 'react';
import Profile from './Profile';
import AssetInfo from './AssetInfo';
import StockList from './StockList';
import TradingSlidingPanel from './TradeSlidingPanel';
import SlidingPanel from '../components/SlidingPanel';

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
