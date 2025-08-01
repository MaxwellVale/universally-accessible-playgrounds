import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import LocateButton from './LocateButton.jsx';

// Images for markers and shadows downloaded from pointhi's Github repo: https://github.com/pointhi/leaflet-color-markers
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
  shadowUrl: '/src/assets/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41], 
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function ScaleControl() { // to show live scale bars when zooming
  const map = useMap();

  useEffect(() => {
    const scale = L.control.scale({ 
      position: 'bottomleft',
      imperial: true,
      metric: true,
    }).addTo(map);

    const forceUpdate = () => {
      scale._update();
    };

    map.on('zoom', forceUpdate);
    map.on('move', forceUpdate);

    return () => {
      map.off('zoom', forceUpdate);
      map.off('move', forceUpdate);
      scale.remove();
    };
  }, [map]);

  return null;

}

function CenterCoords() { // tracks the current location of the center of the viewport (lat, lng)
  const map = useMap();
  const [center, setCenter] = useState(map.getCenter()); // useState to track dynamically changing attribute and display on page

  useEffect(() => {
    const updateCenter = () => {
      setCenter(map.getCenter());
    };

    map.on('move', updateCenter);

    return () => map.off('move', updateCenter);
  }, [map]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 1000, // something with the layering of the assets got messed up, need to look into proper fix for this
      }}
    >
      {center.lat.toFixed(5)}, {center.lng.toFixed(5)}
    </div>
  );
}

function HomeButton({ homeCenter = [[34.05, -118.25]] }) { // create button to return to the map instance's default view
  const map = useMap();

  useEffect(() => {
    const homeButton = L.control({position: 'topleft'});

    homeButton.onAdd = () => {
      const container = L.DomUtil.create('div', 'leaflet-bar');
      const link = L.DomUtil.create('img', '', container);
      link.href = '#';
      link.title = 'Return to home view';
      
      // overlay svg onto the button
      const img = L.DomUtil.create('img', '', link);
      img.src = '/src/assets/home-icon-silhouette-svgrepo-com.svg';
      img.width = 20;
      img.height = 20;
      img.alt = 'Home';

      link.style.width = '30px'; // trying to control the button size to match the built in zoom buttons
      link.style.height = '30px';
      link.style.display = 'flex';
      link.style.justifyContent = 'center';

      L.DomEvent.on(link, 'click', L.DomEvent.stopPropagation) 
        .on(link, 'click', L.DomEvent.preventDefault)
        .on(link, 'click', () => {
          if (map && Array.isArray(homeCenter) && homeCenter.length ===2) {
            map.flyTo(homeCenter)
          }
          console.log('home:', homeCenter);

        });

      return container;
    };

    homeButton.addTo(map);

    return () => homeButton.remove();
  }, [map, homeCenter]);

  return null;
}

export default function PlaygroundsMap({ playgrounds, highlightID = null, center = [[34.05, -118.25]] }) {
  const playground = playgrounds.find(p => p.id === highlightID);
  const homeCenter = playground && typeof playground.lat === 'number' && typeof playground.lng === 'number' 
    ? [playground.lat, playground.lng] : [34.05, -118.25];

  return (
    // ensure that keyboard operability is maintained by using built-in MapContainer and Marker components
    <MapContainer 
      key={highlightID} // force a refresh of the <MapContainer> whenever the key changes
      center={homeCenter}
      zoom={11} 
      style={{ height: '400px', width: '100%' }}
      wheelPxPerZoomLevel={100}
      zoomSnap={0.25}
      zoomDelta={0.25}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        maxZoom={19}
        attribution='© OpenStreetMap'
      />
      <LocateButton />
      <ScaleControl />
      <CenterCoords />
      <HomeButton homeCenter={homeCenter} />
      {playgrounds.map(p => (
        <Marker 
          alt={p.name} // markers need to have unique and descriptive labels for accessibility purposes (screen readers)
          key={p.id} 
          position={[p.lat, p.lng]}
          icon={p.id === highlightID ? RedIcon : BlueIcon}
        >
          <Popup>
            <b>{p.name}</b><br />
            <Link to={`/playgrounds/${p.id}`}>View Details</Link> {/* have map button link to playground details page */}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}