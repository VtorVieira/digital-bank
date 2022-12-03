const { verify } = require('jsonwebtoken');

const { CustomError } = require('../errors/CustomErrors');

const { JWT_SECRET } = process.env;

const validations = {
  validateToken: (req, _res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new CustomError(401, 'Token not found');
    }
    try {
      verify(authorization, JWT_SECRET);
      next();
    } catch (err) {
      throw new CustomError(401, 'Token must be a valid token');
    }
  },

  validateRegister: (req, _res, next) => {
    const { name, cpf } = req.body;

    if (!name || !cpf) {
      throw new CustomError(400, 'Todos os campos devem ser preenchidos');
    }
    if (name < 3) {
      throw new CustomError(400, 'Nome deve ter pelo menos 3 caracteres');
    }
    if (cpf.length < 11 || cpf.length > 11) {
      throw new CustomError(400, 'CPF inválido, favor forneça um CPF valido!');
    }
    next();
  },

  validateLogin: (req, _res, next) => {
    const { cpf } = req.body;

    if (cpf.length < 11 || cpf.length > 11) {
      throw new CustomError(400, 'CPF inválido, favor forneça um CPF valido!');
    }
    next();
  },
};

module.exports = validations;
