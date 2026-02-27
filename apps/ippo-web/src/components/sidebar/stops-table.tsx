import styles from './stops-table.module.css';
import { Stops } from '@mandos-dev/gtfs-core';

interface StopsTableProps {
  stops: Stops[];
}

export function StopsTable({ stops }: StopsTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Lat</th>
          <th>Lon</th>
        </tr>
      </thead>
      <tbody>
        {stops.map((stop) => (
          <tr key={stop.stop_id}>
            <td>{stop.stop_id}</td>
            <td>{stop.stop_name}</td>
            <td>{stop.stop_lat}</td>
            <td>{stop.stop_lon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
