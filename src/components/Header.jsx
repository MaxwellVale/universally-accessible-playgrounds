import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='header'>
      <h1>Accessible Parks</h1>
      <nav className='main-nav'>
        <Link to="/">Home</Link>
        <span className='divider'>|</span>
        <Link to="/playgrounds">Playgrounds</Link>
        <span className='divider'>|</span>
        <Link to="/about">About Us</Link>
      </nav>
    </header>
  );
}