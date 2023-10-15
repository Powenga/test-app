import styles from './App.module.css';
import block from 'bem-css-modules';
import Form from '../Form/Form';
const b = block(styles);

export function App() {
  return (
    <div className={b()}>
      <h1>User search</h1>
      <Form />
    </div>
  );
}

export default App;
