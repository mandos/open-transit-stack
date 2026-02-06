// Uncomment this line to use CSS modules
// import styles from './app.module.css';
// import NxWelcome from './nx-welcome';
import { MapComponentsProvider, MapLibreMap } from '@mapcomponents/react-maplibre';
import { LayerSpecification, SourceSpecification, StyleSpecification } from 'maplibre-gl';

// import { Route, Routes, Link } from 'react-router-dom';
//
const style: StyleSpecification = {
  version: 8,
  layers: [
    {
      id: "main",
      type: "raster",
      "source": "openStreet",
    } as LayerSpecification
  ],
  sources: {
    openStreet: {
      type: "raster",
      tiles: [
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      ],
      minzoom: 4,
      maxzoom: 15,
      volatile: false

    } as SourceSpecification,
  }
};

export function App() {
  return (
    <div id="map">
      <MapComponentsProvider>
        <MapLibreMap
          options={{
            container: 'map', // container id
            // style: 'https://demotiles.maplibre.org/style.json', // style URL
            style: style,
            center: [141.352077, 43.067554], // starting position [lng, lat]
            zoom: 11, // starting zoom
          }}
        />
      </MapComponentsProvider>
    </div>

  );
}

export default App;
