import { type ChangeEvent, useCallback, useRef, useState } from 'react';
import { useGtfsUpload } from './use-gtfs-upload';
import { StopsTable } from './stops-table';
import styles from './sidebar.module.css';

const MIN_WIDTH = 200;
const MAX_WIDTH = 600;
const DEFAULT_WIDTH = 320;

export function Sidebar() {
  const { state, handleFile } = useGtfsUpload();
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const dragging = useRef(false);

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragging.current = true;
      (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return;
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX));
      setWidth(newWidth);
    },
    []
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <aside className={styles.sidebar} style={{ width }}>
      <h2 className={styles.heading}>GTFS Upload</h2>
      <input
        type="file"
        accept=".zip"
        onChange={onFileChange}
        className={styles.fileInput}
      />
      {state.status === 'loading' && (
        <p className={styles.statusMessage}>Processing...</p>
      )}
      {state.status === 'error' && (
        <p className={styles.errorMessage}>{state.message}</p>
      )}
      {state.status === 'success' && (
        <>
          <p className={styles.statusMessage}>
            {state.stops.length} stops loaded
          </p>
          <StopsTable stops={state.stops} />
        </>
      )}
      <div
        className={styles.resizeHandle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </aside>
  );
}
