import GlobalStyle from '../src/styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HostHome from '@pages/host/Home';
import GameLobby from '@pages/host/GameLobby';
import GameResult from '@pages/host/GameResult';
import Buy from '@pages/participant/Buy';
import Sell from '@pages/participant/Sell';
import Dashboard from '@pages/participant/Dashboard';
import ParticipantHome from '@pages/participant/Home';
import About from '@pages/About';
import Contact from '@pages/Contact';
import Page404 from '@pages/Page404';
import { StompProvider } from '@contexts/SocketContext';
import Enter from '@pages/Enter';
import Home from '@pages/Home';

function App() {
  return (
    <>
      <GlobalStyle />
      <StompProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/enter" element={<Enter />} />
            <Route path="/host" element={<HostHome />} />
            <Route path="/participant" element={<ParticipantHome />} />

            <Route path="/host/room/wait" element={<GameLobby />} />
            <Route path="/host/room/result" element={<GameResult />} />

            <Route path="/participant/wallet" element={<Dashboard />} />
            <Route path="/participant/purchase" element={<Buy />} />
            <Route path="/participant/sell" element={<Sell />} />

            <Route path={'*'} element={<Page404 />} />
          </Routes>
        </Router>
      </StompProvider>
    </>
  );
}

export default App;
