import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Approach from './pages/Approach.jsx';
import Shortlist from './pages/Shortlist.jsx';
import PlayerDetail from './pages/PlayerDetail.jsx';
import Evidence from './pages/Evidence.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="approach" element={<Approach />} />
          <Route path="shortlist" element={<Shortlist />} />
          <Route path="player/:role/:id" element={<PlayerDetail />} />
          <Route path="evidence" element={<Evidence />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
