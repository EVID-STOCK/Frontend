import React from 'react';
import GlobalStyle from '../src/styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '@pages/Main';
import WaitingRoomLayout from '@pages/WaitingRoom';
import GameResult from '@pages/GameResult';
import Buy from '@pages/student/Buy';
import Sell from '@pages/student/Sell';
import Wallet from '@pages/student/Wallet';
import StudentMain from '@pages/student/Main';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/room/wait" element={<WaitingRoomLayout />}></Route>
          <Route path="/room/1/result" element={<GameResult />}></Route>

          {/* 학생들 */}
          <Route path="/student" element={<StudentMain />}></Route>
          <Route path="/student/wallet" element={<Wallet />}></Route>
          <Route path="/student/buy" element={<Buy />}></Route>
          <Route path="/student/sell" element={<Sell />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
