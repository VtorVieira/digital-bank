require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const express = require('express');
const routers = require('./router');

const { API_PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', routers.userRouter);

app.use((err, _req, res, _next) => {
  const { status, message } = err;
  console.log('erroooooooooooooooor', message);
  return res.status(status).json({ message });
});

app.listen(API_PORT, () => console.log(`Iniciando na porta ${API_PORT}`));