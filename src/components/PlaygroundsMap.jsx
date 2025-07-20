import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

export const BlueIcon = new L.Icon({
  iconUrl: '/src/assets/marker-icon-2x-blue.png',
  shadowUrl: '/src/assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const RedIcon = new L.Icon({
  iconUrl: '/src/assets/marker-icon-2x-red.png',
  shadowUrl: 'src/assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


export default function PlaygroundsMap({ playgrounds, highlightID = null }) {
  const playground = playgrounds.find(p => p.id === highlightID);

  return (
    // ensure that keyboard operability is maintained by using built-in MapContainer and Marker components
    <MapContainer 
      key={highlightID} // force a refresh of the <MapContainer> whenever the key changes
      center={playground ? [playground.lat, playground.lng] : [34.05, -118.25]} 
      zoom={11} 
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        maxZoom={19}
      />
      {playgrounds.map(p => (
        <Marker 
          alt={p.name} // markers need to have unique and descriptive labels for accessibility purposes (screen readers)
          key={p.id} 
          position={[p.lat, p.lng]}
          icon={p.id === highlightID ? RedIcon : BlueIcon}
        >
          <Popup>
            <b>{p.name}</b><br />
            <Link to={`/playgrounds/${p.id}`}>View Details</Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}