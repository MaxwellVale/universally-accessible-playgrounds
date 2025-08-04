import fs from 'fs';
import axios from 'axios';
import originalData from './playgroundData.js';
import 'dotenv/config';
const GOOGLE_API_KEY = process.env.VITE_GOOGLE_API_KEY;
// console.log(GOOGLE_API_KEY);

async function fetchDetails(place_id) {
  const url = `https://places.googleapis.com/v1/places/${place_id}?fields=id,location,formattedAddress,displayName&key=${GOOGLE_API_KEY}`;
  const place_details_url = `https://places.googleapis.com/v1/places/${place_id}?fields=name,displayName,formattedAddress,addressComponents,nationalPhoneNumber,location,photos,reviews,attributions&key=${GOOGLE_API_KEY}`;
  
  try {
    const response = await axios.get(place_details_url);
    return response.data;
  } catch (err) {
    console.error(`Error fetching data for ${place_id}:`, err.response?.data || err.message);
    return null;
  }
}

async function updateData() {
  const updated = [];

  for (const playground of originalData) {
    const needsCoords = !playground.lat || !playground.lng;

    if (!playground.place_id || !needsCoords) {
      updated.push(playground);
      continue;
    }

    const details = await fetchDetails(playground.place_id);

    if (details?.location) {
      playground.lat = details.location.latitude;
      playground.lng = details.location.longitude;
      playground.address = details.formattedAddress || playground.address;
      playground.name = details.displayName?.text || playground.name;
    }

    updated.push(playground);
  }

  fs.writeFileSync('./src/data/PlaygroundsData_updated.js',
    'module.exports = ' + JSON.stringify(updated, null, 2)
  );

  console.log('Playground data updated and written to PlaygroundsData_updated.js');
}

updateData();