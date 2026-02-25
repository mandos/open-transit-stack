import { Outlet } from 'react-router-dom';
import styles from './app.module.css';
import { Header } from '../components/header/header';

export function App() {
  return (
    <div className={styles.shell}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
