const { Router } = require('express');

const userControllers = require('../controllers/userController');
const validate = require('../middleware/validate');

const userRouter = Router();

userRouter.post('/one', userControllers.findOne);
userRouter.get('/all', userControllers.findAll);
userRouter.post('/signin', validate.validateLogin, userControllers.findByCPF);
userRouter.post('/signup', validate.validateRegister, userControllers.createUser);

module.exports = userRouter;