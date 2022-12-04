require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const express = require('express');
const routers = require('./router');

const { API_PORT } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', routers.userRouter);
app.use('/account', routers.accountRouter);
app.use('/token', routers.tokenRouter);
app.use('/transactions', routers.transactionRouter);

app.use((err, _req, res, _next) => {
  const { status, code } = err;
  return res.status(status).json({ code });
});

app.listen(API_PORT, () => console.log(`Iniciando na porta ${API_PORT}`));

module.exports = app;