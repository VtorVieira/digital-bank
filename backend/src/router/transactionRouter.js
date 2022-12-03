const { Router } = require('express');

const transactionController = require('../controllers/transactionControllers');

const transactionRouter = Router();

transactionRouter.post('/', transactionController.getTransactionsUser);

module.exports = transactionRouter;