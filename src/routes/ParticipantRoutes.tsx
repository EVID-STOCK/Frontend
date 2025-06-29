import ErrorBoundaryWrapper from '@utils/ErrorBoundaryWrapper';
import ParticipantProtectedRoutes from '@utils/ParticipantProtectedRoutes';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const ParticipantHome = lazy(() => import('@pages/participant/Home'));
const Dashboard = lazy(() => import('@pages/participant/Dashboard'));
const Purchase = lazy(() => import('@pages/participant/Purchase'));
const Sell = lazy(() => import('@pages/participant/Sell'));

export default function PariticipantRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ParticipantHome />} />
      <Route element={<ErrorBoundaryWrapper />}>
        <Route element={<ParticipantProtectedRoutes />}>
          <Route path="wallet" element={<Dashboard />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="sell" element={<Sell />} />
        </Route>
      </Route>
    </Routes>
  );
}
