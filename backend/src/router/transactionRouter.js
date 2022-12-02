const { Router } = require('express');

const transactionController = require('../controllers/transactionControllers');
const validate = require('../middleware/validate');

const transactionRouter = Router();

// transactionRouter.get('/', transactionController.findAll);
transactionRouter.post('/', transactionController.getTransactionsUser);

module.exports = transactionRouter;