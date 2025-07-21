// PlaygroundDetails.jsx
import { useParams, Link } from 'react-router-dom'
import { playgrounds } from '../data/playgroundData.js'
import PlaygroundsMap from '../components/PlaygroundsMap.jsx'

export default function PlaygroundDetails() {
  const { playgroundID } = useParams()
  const playground = playgrounds.find(p => p.id === playgroundID)

  if (!playground) {
    return <h2>Playground not found.</h2>
  }

  return (
    <>
        <h2 className='info-heading'>{playground.name}</h2>
        <p className='description'>
            {playground.description}<br />
            Coordinates: {playground.lat}, {playground.lng}
        </p>
        <div className='playgrounds-map'>
            <PlaygroundsMap playgrounds={ playgrounds } highlightID={ playgroundID } />
        </div>
    </>
  );
}
