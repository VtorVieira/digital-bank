const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { CustomError } = require('../errors/CustomErrors');
const { User, Account } = require('../database/models');

const generate = require('../helpers/generateToken');

const sequelize = new Sequelize(
  process.env.NODE_ENV === 'dev' ? config.test : config.development,
);

const userService = {
  findOne: async (cpf) => {
    const user = await User.findOne({ where: { cpf }, raw: true });
    return user;
  },

  findAll: async () => {
    const allUser = await User.findAll();
    return allUser;
  },

  findByCPF: async (cpf) => {
    const user = await User.findOne({ where: { cpf }, raw: true });
    if (!user) throw new CustomError(401, 'Nome ou CPF incorreto!');
    const { id, name } = user;
    const token = generate.generateToken(id, name, cpf);
    return token;
  },

  createUser: async (name, cpf) => {
    const user = await User.findOne({ where: { cpf }, raw: true });

    if (user) {
      throw new CustomError(401, 'Usuário já cadastrado no sistema!');
    }

    const result = await sequelize.transaction(async (t) => {
      const createdAccount = await Account.create(
        { balance: 0.00 },
        { transaction: t },
      );

      const createdUser = await User.create({
        name,
        cpf,
        accountId: createdAccount.id,
      }, { transaction: t });

      return createdUser;
    });

    return result.dataValues;
  }
};

module.exports = userService;