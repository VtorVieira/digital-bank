const Exception = require('../errors/CustomErrors');
const { User } = require('../database/models');

const generateToken = require('../helpers/generateToken');

const userService = {
  createUser: async (name, cpf) => {
    const userCPF = await User.findOne({ where: { cpf } });
    if (userCPF) throw new Exception(401, 'CPF já se encontra cadastrado!');
    const createUser = await User.create(name, cpf);
    return createUser;
  },
  findByCPF: async (cpf) => {
    console.log('service', cpf);
    const userCPF = await User.findOne({ where: { cpf } });
    if (userCPF === null) if (userCPF) throw new Exception(401, 'Nome ou CPF incorreto!');
    const token = generateToken(cpf);
    return token;
  },
};

module.exports = userService;