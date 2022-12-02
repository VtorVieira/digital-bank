const { Router } = require('express');

const tokenControllers = require('../controllers/tokenController');
const validate = require('../middleware/validate');

const tokenRouter = Router();

tokenRouter.post('/', validate.validateToken, tokenControllers.validateUser);

module.exports = tokenRouter;