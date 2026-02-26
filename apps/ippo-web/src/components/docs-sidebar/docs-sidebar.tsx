import { NavLink } from 'react-router-dom';
import { docs } from '../../docs';
import styles from './docs-sidebar.module.css';

export function DocsSidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.heading}>Documentation</h2>
      <nav>
        <ul className={styles.list}>
          {docs.map((doc) => (
            <li key={doc.slug}>
              <NavLink
                to={`/docs/${doc.slug}`}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {doc.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
