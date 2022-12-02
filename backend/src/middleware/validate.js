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

  validateLogin: (req, _res, next) => {
    const { name, cpf } = req.body;
    const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    if (!name || !cpf) {
      throw new CustomError(400, 'Todos os campos devem ser preenchidos');
    }
    if (name < 3) {
      throw new CustomError(401, 'Nome deve ter pelo menos 3 caracteres');
    }
    if (!regex.test(cpf)) {
      throw new CustomError(401, 'CPF inválido, favor forneça um CPF valido!');
    }
    next();
  },
};

module.exports = validations;
