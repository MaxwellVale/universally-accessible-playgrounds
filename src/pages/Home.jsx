import PlaygroundsMap from "../components/PlaygroundsMap";
import playgrounds from '../data/PlaygroundData.js';

export default function Home() {
  return (
    <div className="playgrounds-main">
      <h2 className="info-heading">Welcome to Accessible Parks!</h2>
      <p className="description">Find parks and playgrounds that are accessible to everyone in your community.</p>
      <div className='playground-map'>
        <PlaygroundsMap playgrounds={ playgrounds } />
      </div>    
    </div>
  );
}