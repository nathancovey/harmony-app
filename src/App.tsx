import { HashRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/main-layout';
import ThisWeek from './pages/this-week';
import Mission from './pages/mission';
import LongTermGoals from './pages/long-term-goals';
import History from './pages/history';
import Analytics from './pages/analytics';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ThisWeek />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/long-term-goals" element={<LongTermGoals />} />
          <Route path="/history" element={<History />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;