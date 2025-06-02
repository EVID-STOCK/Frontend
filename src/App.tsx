import GlobalStyle from '../src/styles/GlobalStyle';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page404 from '@pages/Page404';
import { StompProvider } from '@contexts/SocketContext';
import Enter from '@pages/Enter';
import Home from '@pages/Home';
import { lazy, Suspense } from 'react';
import HostRoutes from '@routes/HostRoutes';
import PariticipantRoutes from '@routes/ParticipantRoutes';
import styled from 'styled-components';

const About = lazy(() => import('@pages/About'));
const Contact = lazy(() => import('@pages/Contact'));

const Fallback = styled.section`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(120deg, #3f51b5, #00bbd4 100%);
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StompProvider>
        <Router>
          <Suspense fallback={<Fallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/enter" element={<Enter />} />
              <Route path="/host/*" element={<HostRoutes />} />
              <Route path="/participant/*" element={<PariticipantRoutes />} />
              <Route path={'*'} element={<Page404 />} />
            </Routes>
          </Suspense>
        </Router>
      </StompProvider>
    </>
  );
}

export default App;
