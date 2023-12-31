import React from 'react';
import GlobalStyle from '../src/styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { registerSocket } from 'socket';
import Main from '@pages/Main';
import WaitingRoomLayout from '@pages/WaitingRoom';
import GameResult from '@pages/GameResult';
import Buy from '@pages/student/Buy';
import Sell from '@pages/student/Sell';
import Wallet from '@pages/student/Wallet';
import StudentMain from '@pages/student/Main';
import About from '@pages/About';
import Contact from '@pages/Contact';
import ErrorPage from '@pages/404Page';

function App() {
  const socket = () => {
    registerSocket();
  };

  socket();

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/room/wait" element={<WaitingRoomLayout />} />
          <Route path="/room/result" element={<GameResult />} />

          {/* 학생들 */}
          <Route path="/student" element={<StudentMain />} />
          <Route path="/student/wallet" element={<Wallet />} />
          <Route path="/student/buy" element={<Buy />} />
          <Route path="/student/sell" element={<Sell />} />

          <Route path={'*'} element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
