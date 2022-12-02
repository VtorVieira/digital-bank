const userService = require('../services/userService');

const userControllers = {
  findOne: async (req, res) => {
    const user = await userService.findOne(req.body.cpf);
    res.status(200).json(user);
  },
  findAll: async (_req, res) => {
    const allUsers = await userService.findAll();
    res.status(200).json(allUsers);
  },
  createUser: async (req, res) => {
    const { name, cpf } = req.body;
    await userService.createUser(name, cpf);
    return res.status(201).json({ message: 'Usuário criado com sucesso' });
  },
  findByCPF: async (req, res) => {
    const { cpf } = req.body;
    const token = await userService.findByCPF(cpf);
    res.status(200).json({ token });
  }
};

module.exports = userControllers;