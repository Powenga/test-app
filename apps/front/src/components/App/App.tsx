import styles from './App.module.css';
import block from 'bem-css-modules';

const b = block(styles);

export function App() {
  return <div className={b()}></div>;
}

export default App;
