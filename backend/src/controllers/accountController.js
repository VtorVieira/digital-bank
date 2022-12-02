const accountService = require('../services/accountService');

const accountControllers = {
  findAll: async (_req, res) => {
    const allAccount = await accountService.findAll();
    res.status(200).json(allAccount);
  },

  getBalanceUser: async (req, res) => {
    const { id } = req.body;
    const { balance } = await accountService.getBalanceUser(id);
    res.status(200).json(balance);
  },

  sendBalanceUser: async (req, res) => {
    const { debitedUser, creditedUser, value } = req.body;
    const transfer = await accountService.sendBalanceUser(debitedUser, creditedUser, value);
    res.status(200).json({ transfer });
  },

  sendDepositUser: async (req, res) => {
    const { creditedUser, value } = req.body;
    console.log('controller', req.body);
    const deposit = await accountService.sendDepositUser(creditedUser, value);
    res.status(200).json({ deposit });
  },
};

module.exports = accountControllers;