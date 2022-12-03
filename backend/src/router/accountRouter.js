const { Router } = require('express');

const accountControllers = require('../controllers/accountController');
const validate = require('../middleware/validate');

const accountRouter = Router();

accountRouter.post('/all', accountControllers.findAll);
accountRouter.post('/balance', accountControllers.getBalanceUser);
accountRouter.post('/transfer', accountControllers.sendTransferUser);
accountRouter.post('/deposit', accountControllers.sendDepositUser);

module.exports = accountRouter;