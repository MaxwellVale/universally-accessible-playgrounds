import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header style={{ background: '#0077aa', color: '#fff', padding: '1rem' }}>
      <h1>Accessible Parks</h1>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/playgrounds">Playgrounds</Link>
      </nav>
    </header>
  );
}