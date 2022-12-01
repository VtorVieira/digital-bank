const { Router } = require('express');

const userControllers = require('../controllers/userController');
const validations = require('../middleware/validate');

const userRouter = Router();

userRouter.post('/signin', userControllers.findByCPF);
// userRouter.post('/singup', validations.validateLogin, userControllers.createUser);

module.exports = userRouter;