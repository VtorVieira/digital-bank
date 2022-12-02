const { sign } = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtCheckUser = {
  generateToken: (id, name, cpf) => {
    const token = sign({ id, name, cpf }, JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  },

};

module.exports = jwtCheckUser;

