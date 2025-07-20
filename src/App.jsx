import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layouts/Layout.jsx';
import PlaygroundsLayout from './Layouts/PlaygroundsLayout.jsx';
import Home from './pages/Home.jsx';
import PlaygroundsList from './pages/PlaygroundsList.jsx';
import PlaygroundDetails from './pages/PlaygroundDetails.jsx';
import About from './pages/About.jsx';
import NoPage from './pages/NoPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout section */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Playground specific page layout */}
          <Route path="playgrounds" element={<PlaygroundsLayout />}>
            <Route index element={<PlaygroundsList />} />
            <Route path=":playgroundID" element={<PlaygroundDetails />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}