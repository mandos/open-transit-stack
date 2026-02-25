import styles from './application-page.module.css';
import { Sidebar } from '../sidebar/sidebar';
import { MapView } from '../map-view/map-view';

export function ApplicationPage() {
  return (
    <div className={styles.page}>
      <Sidebar />
      <MapView />
    </div>
  );
}
