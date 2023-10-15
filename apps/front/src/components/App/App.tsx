import styles from './App.module.css';
import block from 'bem-css-modules';
import Form from '../Form/Form';
const b = block(styles);

export function App() {
  return (
    <div className={b()}>
      <Form />
    </div>
  );
}

export default App;
