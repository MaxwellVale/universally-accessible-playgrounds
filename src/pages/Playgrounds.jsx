import PlaygroundsMap from '../components/PlaygroundsMap.jsx';
import playgrounds from '../data/playgroundData.js';

export default function Playgrounds() {
  return (
    <>
      <h2 className='info-heading'>Universally Accessible Playgrounds</h2>
      <p className='description'>Find playgrounds that are accessible for everyone in your community.</p>
      <div className='playground-map'>
        <PlaygroundsMap playgrounds={ playgrounds } />
      </div>
    </>
  );
}