const userService = require('../services/userService');

const userControllers = {
  // createUser: async (req, res) => {
  //   // const { name, cpf } = req.boby;
  //   console.log('to aqui create', req.boby);
  //   await userService.createUser(name, cpf);
  //   return res.status(201).json({ message: 'Usuário criado com sucesso' });
  // },
  findByCPF: async (req, res) => {
    // const { cpf } = req.boby;
    console.log('to aqui find', req.body.cpf);
    const token = await userService.findByCPF(req.body.cpf);
    res.status(200).json({ token });
  }
};

module.exports = userControllers;