const transactionService = require('../services/transactionService');

const transactionController = {
  findAll: async (_req, res) => {
    const allAccount = await accountService.findAll();
    res.status(200).json(allAccount);
  },

  getTransactionsUser: async (req, res) => {
    const { cpf } = req.body;

    let transactions = await transactionService.getTransactionsUser(cpf);

    /*
      Responsável pela construção da tabela de histórico

      Monta o objeto experado no front, com as colunas date, type, name e price
      E faz a transformação das informações esperadas, como:
      Data: Padrão YYYY/MM/DD
      Tipo de transferência: Deposito / Enviada / Recebida
      Name: Valida quem esta fazendo a transação para apresentar o nome
      price: o valor de cada transação
      
    */
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