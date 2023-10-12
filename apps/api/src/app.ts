import express from 'express';
import router from './routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(router);

app.use(errorHandler);

export default app;
