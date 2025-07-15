import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Playgrounds from './pages/Playgrounds.jsx';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playgrounds" element={<Playgrounds />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;