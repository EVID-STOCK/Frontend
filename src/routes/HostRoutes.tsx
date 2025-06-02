import HostProtectedRoutes from '@utils/HostProtectedRoutes';
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const HostHome = lazy(() => import('@pages/host/Home'));
const GameLobby = lazy(() => import('@pages/host/GameLobby'));
const GameResult = lazy(() => import('@pages/host/GameResult'));

export default function HostRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HostHome />} />
      <Route element={<HostProtectedRoutes />}>
        <Route path="room/wait" element={<GameLobby />} />
        <Route path="room/result" element={<GameResult />} />
      </Route>
    </Routes>
  );
}
