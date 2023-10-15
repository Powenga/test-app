import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT = 3000,
  DELAY = 5000,
  ORIGIN = 'http://localhost:4200',
} = process.env;
