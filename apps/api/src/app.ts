import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log(req.url);
  res.send({ message: 'HELLO' });
});

export default app;
