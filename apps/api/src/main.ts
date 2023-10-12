import app from './app';
import { PORT } from './config';

app.listen(PORT, () => {
  console.log(`[ ready ] http://localhost:${PORT}`);
});
