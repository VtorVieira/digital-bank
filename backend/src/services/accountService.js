const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { CustomError } = require('../errors/CustomErrors');
const { Account, User, Transaction } = require('../database/models');

const sequelize = new Sequelize(
  process.env.NODE_ENV === 'dev' ? config.test : config.development,
);

const accountService = {
  findAll: async () => {
    const allUser = await Account.findAll();
    return allUser;
  },

  getBalanceUser: async (userId) => {
    const user = await User.findByPk(userId);
    const account = await Account.findOne({
      where:
        { id: user.accountId },
      raw: true
    });
    return account;
  },

  checkBalanceUser: async (cpf, balance) => {
    const debitedUser = await User.findOne({ where: { cpf }, raw: true });
    const debitedAccountRec = await Account.findOne({ where: { id: debitedUser.id }, raw: true });

    if (debitedAccountRec.balance < balance || balance <= 0) {
      throw new CustomError(401, 'Saldo insuficiente, por gentileza, digite um outro valor!');
    }
    return debitedAccountRec;
  },

  sendDepositUser: async (cpf, balance) => {
    console.log('passo 1');
    const convertBalance = balance.toString().replace(',', '.');
    console.log('passo 2');
    const creditedUser = await User.findOne({ where: { cpf }, raw: true });
    console.log('passo 3');
    const creditedAccountRec = await Account.findOne({ where: { id: creditedUser.accountId }, raw: true });
    console.log('passo 4');
    const newBalanceCreditedUser = (Number(creditedAccountRec.balance) + Number(convertBalance));
    console.log('passo 5');
    const result = await sequelize.transaction(async (t) => {
      console.log('passo 6');
      const newTransaction = await Transaction.create(
        {
          debitedAccountId: creditedAccountRec.id,
          creditedAccountId: creditedAccountRec.id,
          value: Number(convertBalance),
          createdAt: Date()
        },
        { transaction: t },
      );
      console.log('passo 7');
      await Account.update(
        { balance: Number(newBalanceCreditedUser) }, { where: { id: creditedUser.accountId } }
      );
      console.log('passo 8');
      return newTransaction;
    });

    return result;
  },

  sendBalanceUser: async (cpfRequest, cpfReceiver, balance) => {
    const convertBalance = balance.toString().replace(',', '.');

    if (cpfRequest === cpfReceiver) {
      throw new CustomError(401, 'Você não pode transferir valor para você mesmo!');
    }

    const debitedAccountRec = await accountService.checkBalanceUser(cpfRequest, Number(convertBalance));

    const debitedUser = await User.findOne({ where: { cpf: cpfRequest }, raw: true });
    const creditedUser = await User.findOne({ where: { cpf: cpfReceiver }, raw: true });
    if (!creditedUser) throw new CustomError(401, 'CPF não encontrado!');

    const creditedAccountRec = await Account.findOne({ where: { id: creditedUser.accountId }, raw: true });

    const newBalanceDebitedUser = (Number(debitedAccountRec.balance) - Number(convertBalance));
    const newBalanceCreditedUser = (Number(creditedAccountRec.balance) + Number(convertBalance));

    const result = await sequelize.transaction(async (t) => {

      const newTransaction = await Transaction.create(
        {
          debitedAccountId: debitedAccountRec.id,
          creditedAccountId: creditedAccountRec.id,
          value: Number(convertBalance),
          createdAt: Date()
        },
        { transaction: t },
      );

      await Account.update(
        { balance: Number(newBalanceCreditedUser) }, { where: { id: creditedUser.accountId } }
      );

      await Account.update(
        { balance: Number(newBalanceDebitedUser) }, { where: { id: debitedUser.accountId } }
      );

      return newTransaction;
    });

    return result;
  },
};

module.exports = accountService;