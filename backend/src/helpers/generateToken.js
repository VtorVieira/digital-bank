const { sign } = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtCheckUser = {
  generateToken: (email) => {
    const token = sign({ email }, JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  },

};

module.exports = jwtCheckUser;

