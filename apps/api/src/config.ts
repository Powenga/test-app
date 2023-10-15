import dotenv from 'dotenv';

dotenv.config();

export const { PORT = 3000, DELAY = 5000 } = process.env;
