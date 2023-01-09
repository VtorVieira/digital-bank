import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4001',
});

export const verifyToken = async (token) => {
  try {
    const retorno = await api.post('/token', {}, {
      headers: {
        authorization: token,
      },
    });
    return retorno.data;
  } catch (error) {
    return false;
  }
};

export const postLogin = async (name, cpf) => {
  const { data } = await api.post('/signin', { name, cpf });
  return data;
};

export const postRegister = async (name, cpf) => {
  const { data } = await api.post('/signup', { name, cpf });
  return data;
};

export const checkBalance = async ({ id }) => {
  const { data } = await api.post('/account/balance', { id });
  return Number(data);
};

export const postTransfer = async (debitedUser, creditedUser, value) => {
  const { data } = await api.post('/account/transfer', { debitedUser, creditedUser, value });
  return data;
};

export const postDeposit = async (creditedUser, value) => {
  const { data } = await api.post('/account/deposit', { creditedUser, value });
  return data;
};

export const getHistoryUser = async (cpf) => {
  const { data } = await api.post('/transactions', { cpf });
  return data;
};
