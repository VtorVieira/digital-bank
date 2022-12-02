const transactionService = require('../services/transactionService');

const transactionController = {
  findAll: async (_req, res) => {
    const allAccount = await accountService.findAll();
    res.status(200).json(allAccount);
  },

  getTransactionsUser: async (req, res) => {
    const { cpf } = req.body;

    let transactions = await transactionService.getTransactionsUser(cpf);

    transactions = transactions.map((historyTransfer) => {
      const { debitedAccountId, creditedAccountId, debitedAccount, creditedAccount, value } = historyTransfer;

      let typeOfTransaction = '';

      if (debitedAccountId === creditedAccountId) {
        typeOfTransaction = 'Deposito';
      } else if (debitedAccount.User.cpf === cpf) {
        typeOfTransaction = 'Enviada';
      } else {
        typeOfTransaction = 'Recebida';
      }

      const data = new Date(historyTransfer.createdAt);
      return {
        date: data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + ('0' + data.getDate()).slice(-2),
        type: typeOfTransaction,
        name: debitedAccount.User.cpf === cpf
          ? creditedAccount.User.name
          : debitedAccount.User.name,
        price: value,
      };
    });

    res.status(200).json(transactions);
  },

};

module.exports = transactionController;