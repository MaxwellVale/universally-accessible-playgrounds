import { Link } from 'react-router-dom';
import PlaygroundsMap from '../components/PlaygroundsMap.jsx';
import { playgrounds } from '../data/playgroundData.js';

export default function Playgrounds() {
  return (
    <div>
      <h2>Universal Accessible Playgrounds</h2>
      <p>Find playgrounds that are accessible for everyone in your community.</p>
      <PlaygroundsMap playgrounds={ playgrounds } />

      <ul>
        {playgrounds.map(p => (
          <li key={p.id}>
            <Link to={`/playgrounds/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}