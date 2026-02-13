import { useState } from 'react';
import styles from './app.module.css';
import { MapComponentsProvider, MapLibreMap, useMap } from '@mapcomponents/react-maplibre';
import { StyleSpecification } from 'maplibre-gl';

const osmStyle: StyleSpecification = {
  version: 8,
  layers: [
    {
      id: "main",
      type: "raster",
      source: "openStreet",
    },
  ],
  sources: {
    openStreet: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      minzoom: 4,
      maxzoom: 15,
      volatile: false,
    },
  },
};

const satelliteStyle: StyleSpecification = {
  version: 8,
  layers: [
    {
      id: "main",
      type: "raster",
      source: "esriSatellite",
    },
  ],
  sources: {
    esriSatellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      minzoom: 4,
      maxzoom: 18,
      volatile: false,
    },
  },
};

type MapStyle = 'osm' | 'satellite';

function MapStyleToggle({
  activeStyle,
  onToggle,
}: {
  activeStyle: MapStyle;
  onToggle: (style: MapStyle) => void;
}) {
  const mapHook = useMap();

  const handleClick = () => {
    const next: MapStyle = activeStyle === 'osm' ? 'satellite' : 'osm';
    const map = mapHook.map;
    if (map) {
      map.setStyle(next === 'osm' ? osmStyle : satelliteStyle);
    }
    onToggle(next);
  };

  return (
    <button className={styles.toggleButton} onClick={handleClick}>
      {activeStyle === 'osm' ? 'Satellite' : 'Map'}
    </button>
  );
}

export function App() {
  const [activeStyle, setActiveStyle] = useState<MapStyle>('osm');

  return (
    <div id="map">
      <MapComponentsProvider>
        <MapLibreMap
          options={{
            container: 'map',
            style: osmStyle,
            center: [141.352077, 43.067554],
            zoom: 11,
          }}
        />
        <MapStyleToggle activeStyle={activeStyle} onToggle={setActiveStyle} />
      </MapComponentsProvider>
    </div>
  );
}

export default App;
