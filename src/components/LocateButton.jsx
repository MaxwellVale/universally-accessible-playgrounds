import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

export default function LocateButton() {
  const map = useMap();

  useEffect(() => {
    let marker = null;
    let circle = null;

    const locateButton = L.control({ position: 'topleft' });

    locateButton.onAdd = () => {
      const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
      div.style.backgroundColor = '#fff';
      div.style.cursor = 'pointer';
      div.style.padding = '5px';
      div.innerHTML = '📍';

      div.onclick = () => {
        map.locate({ setView: true, maxZoom: 16 });
      };

      return div;
    };

    map.on('locationfound', (e) => {
      console.log('location found:', e);

      // Remove previous marker & circle if any
      if (marker) {
        map.removeLayer(marker);
      }
      if (circle) {
        map.removeLayer(circle);
      }

      // Add accuracy circle
      circle = L.circle(e.latlng, {
        radius: e.accuracy,
        color: '#136AEC',
        fillColor: '#136AEC',
        fillOpacity: 0.2,
      }).addTo(map);

      // Add new marker
      marker = L.circleMarker(e.latlng, {
        radius: 8, 
        color: '#f9f9f9',
        weight: 2,
        fillColor: '#136AEC',
        fillOpacity: 1,
      }).addTo(map)
      .bindPopup("You are within " + e.accuracy + " meters from this point");

    });

    map.on('locationerror', (e) => {
      console.error('Location error:', e);
      alert('Could not get your location. Please check permissions.');
    });


    locateButton.addTo(map);

    return () => {
      locateButton.remove();
      map.off('locationfound');
      map.off('locationerror');
    };
  }, [map]);

  return null;
}
