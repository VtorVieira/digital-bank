const Sequelize = require('sequelize');
const { User, Account, Transaction } = require('../database/models');

const transactionService = {
  //Recupera as transações vinculadas ao usuário logado
  getTransactionsUser: async (cpf) => {
    const user = await User.findOne({
      where:
        { cpf },
      raw: true
    });

    const account = await Account.findOne({
      where:
        { id: user.accountId },
      raw: true
    });

    const transaction = await Transaction.findAll({
      where: {
        [Sequelize.Op.or]: [
          { debitedAccountId: account.id },
          { creditedAccountId: account.id }
        ]
      },
      include: [
        {
          model: Account, as: 'debitedAccount', attributes: { exclude: ['id'] },
          include: [
            {
              model: User, attributes: { exclude: ['id', 'accountId'] }
            }
          ]
        },
        {
          model: Account, as: 'creditedAccount', attributes: { exclude: ['id'] },
          include: [
            {
              model: User, attributes: ['name', 'cpf'],
              nested: true,
            }
          ]
        },
      ],
      nest: true,
      raw: true,
    });

    return transaction;
  }
};

module.exports = transactionService;