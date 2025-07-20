// PlaygroundDetails.jsx
import { useParams } from 'react-router-dom'
import { playgrounds } from '../data/playgroundData.js'
import PlaygroundsMap from '../components/PlaygroundsMap.jsx'

export default function PlaygroundDetails() {
  const { playgroundID } = useParams()
  const playground = playgrounds.find(p => p.id === playgroundID)

  if (!playground) {
    return <h2>Playground not found.</h2>
  }

  return (
    <div>
      <h1>Details for {playground.name}</h1>
      <p>{playground.description}</p>
      <p>Coordinates: {playground.lat}, {playground.lng}</p>
      <PlaygroundsMap playgrounds={ playgrounds } highlightID={ playgroundID } />
    </div>
  );
}
