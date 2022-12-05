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

  // Verifica se o cpf da solicitação existe!
  findUser: async (cpf) => {
    const user = await User.findOne({ where: { cpf }, raw: true });
    if (!user) throw new CustomError(404, 'CPF não encontrado!');
    return user;
  },

  // Recupera o saldo do usuário
  getBalanceUser: async (userId) => {
    const user = await User.findByPk(userId);
    const account = await Account.findOne({
      where:
        { id: user.accountId },
      raw: true
    });
    return account;
  },

  //Verifica nas transação de transaferência, se o usuário tem saldo, e se o valores.
  checkBalanceUser: async (cpf, balance) => {
    const debitedUser = await User.findOne({ where: { cpf }, raw: true });
    const debitedAccountRec = await Account.findOne({ where: { id: debitedUser.id }, raw: true });

    if (debitedAccountRec.balance < balance) {
      throw new CustomError(400, 'Saldo insuficiente, por gentileza, digite um outro valor!');
    }

    if (balance <= 0) {
      throw new CustomError(400, 'Não é possível realizar transferência com valor igual ou menor que R$ 0');
    }
    return debitedAccountRec;
  },

  // Realiza deposito para o proprio usuário
  sendDepositUser: async (cpf, balance) => {
    const convertBalance = balance.toString().replace(',', '.');

    //Valida o limite do deposito, não pode ser maior que R$ 2000
    if (balance > 2000) {
      throw new CustomError(400, 'Por segurança o valor de deposito não pode ser maior que R$ 2000 reais');
    }

    //Encontra o usuário solicitante, e pega o saldo, depois atualiza o novo valor
    const creditedUser = await accountService.findUser(cpf);
    const creditedAccountRec = await Account.findOne({ where: { id: creditedUser.accountId }, raw: true });
    const newBalanceCreditedUser = (Number(creditedAccountRec.balance) + Number(convertBalance));
    const result = await sequelize.transaction(async (t) => {

      const newTransaction = await Transaction.create(
        {
          debitedAccountId: creditedAccountRec.id,
          creditedAccountId: creditedAccountRec.id,
          value: Number(convertBalance),
          createdAt: Date()
        },
        { transaction: t },
      );

      await Account.update(
        { balance: Number(newBalanceCreditedUser) }, { where: { id: creditedUser.accountId } }
      );

      return newTransaction;
    });

    return result;
  },

  /* 
    Realiza transferência para outro usuário cadastrado na aplicação
    para isso é informado o cpf do solicitante e do beneficiado,
    junto com o valor preenchido no front
  */
  sendTransferUser: async (cpfRequest, cpfReceiver, balance) => {
    const convertBalance = balance.toString().replace(',', '.');

    // Não permite que o usuário consiga transfeir para si mesmo
    if (cpfRequest === cpfReceiver) {
      throw new CustomError(400, 'Você não pode transferir valor para você mesmo!');
    }

    /*
      1 - Verifica o saldo do solicitante
      2 - Encontra os usuários origem/destino
      3 - Recupera a conta para pegar o saldo
      4 - Atualiza a conta de ambos os usuários
    */
    const debitedAccountRec = await accountService.checkBalanceUser(cpfRequest, Number(convertBalance));

    const debitedUser = await accountService.findUser(cpfRequest);
    const creditedUser = await accountService.findUser(cpfReceiver);

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