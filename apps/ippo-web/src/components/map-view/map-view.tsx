import { useMemo, useState } from 'react';
import styles from './map-view.module.css';
import {
  MapComponentsProvider,
  MapLibreMap,
  MlGeoJsonLayer,
  useMap,
} from '@mapcomponents/react-maplibre';
import { StyleSpecification } from 'maplibre-gl';
import { Stops } from '@mandos-dev/gtfs-core';
import { FeatureCollection, Point } from 'geojson';

const osmStyle: StyleSpecification = {
  version: 8,
  layers: [
    {
      id: 'main',
      type: 'raster',
      source: 'openStreet',
    },
  ],
  sources: {
    openStreet: {
      type: 'raster',
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
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
      id: 'main',
      type: 'raster',
      source: 'esriSatellite',
    },
  ],
  sources: {
    esriSatellite: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
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

function stopsToGeoJson(stops: Stops[]): FeatureCollection<Point> {
  return {
    type: 'FeatureCollection',
    features: stops
      .filter((s) => s.stop_lat != null && s.stop_lon != null)
      .map((s) => ({
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [s.stop_lon!, s.stop_lat!],
        },
        properties: {
          stop_id: s.stop_id,
          stop_name: s.stop_name ?? '',
        },
      })),
  };
}

interface MapViewProps {
  stops: Stops[];
}

export function MapView({ stops }: MapViewProps) {
  const [activeStyle, setActiveStyle] = useState<MapStyle>('osm');
  const geojson = useMemo(() => stopsToGeoJson(stops), [stops]);

  return (
    <div className={styles.mapContainer}>
      <MapComponentsProvider>
        <MapLibreMap
          options={{
            style: osmStyle,
            center: [141.352077, 43.067554],
            zoom: 11,
          }}
        />
        {geojson.features.length > 0 && (
          <MlGeoJsonLayer
            geojson={geojson}
            type="circle"
            paint={{
              'circle-radius': 5,
              'circle-color': '#e53935',
              'circle-stroke-width': 1,
              'circle-stroke-color': '#ffffff',
            }}
          />
        )}
        <MapStyleToggle activeStyle={activeStyle} onToggle={setActiveStyle} />
      </MapComponentsProvider>
    </div>
  );
}
