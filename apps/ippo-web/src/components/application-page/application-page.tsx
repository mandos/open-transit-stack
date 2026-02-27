import styles from './application-page.module.css';
import { Sidebar } from '../sidebar/sidebar';
import { MapView } from '../map-view/map-view';
import { useGtfsUpload } from '../sidebar/use-gtfs-upload';

export function ApplicationPage() {
  const { state, handleFile } = useGtfsUpload();
  const stops = state.status === 'success' ? state.stops : [];

  return (
    <div className={styles.page}>
      <Sidebar state={state} onFile={handleFile} />
      <MapView stops={stops} />
    </div>
  );
}
