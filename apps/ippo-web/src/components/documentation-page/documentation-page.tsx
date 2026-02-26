import { Outlet } from 'react-router-dom';
import { DocsSidebar } from '../docs-sidebar/docs-sidebar';
import styles from './documentation-page.module.css';

export function DocumentationPage() {
  return (
    <div className={styles.page}>
      <DocsSidebar />
      <Outlet />
    </div>
  );
}
