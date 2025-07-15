import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Map() {
  const playgrounds = [
    {
      name: "Aidan's Place",
      coords: [34.0633, -118.4295],
      link: "playground.html",
    },
    {
      name: "Baldwin Hills Rec Center",
      coords: [34.0066, -118.3635],
      link: "playground.html",
    },
    {
      name: "Hermon Park",
      coords: [34.0972, -118.1983],
      link: "playground.html",
    },
  ];

  return (
    <MapContainer center={[34.05, -118.25]} zoom={11} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        maxZoom={19}
      />
      {playgrounds.map((pg, idx) => (
        <Marker key={idx} position={pg.coords}>
          <Popup>
            <b>{pg.name}</b><br />
            <a href={pg.link}>View Details</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}