import express, { json } from 'express';
import router from './routes';
import cors from 'cors';
import { errorHandler } from './middlewares/error-handler';
import { ORIGIN } from './config';

const app = express();

app.use(cors({ origin: ORIGIN.split(' ') }));
app.use(json());
app.use(router);

app.use(errorHandler);

export default app;
