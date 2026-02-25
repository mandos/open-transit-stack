import styles from './sidebar.module.css';

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.heading}>Options</h2>
      <p className={styles.description}>
        Configure map layers and search parameters here.
      </p>
    </aside>
  );
}
