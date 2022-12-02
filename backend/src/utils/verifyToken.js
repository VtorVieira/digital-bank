const { verify } = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const verifyToken = (token) => {
  try {
    const decode = verify(token, JWT_SECRET);
    return decode;
  } catch (err) {
    return err;
  }
};

module.exports = verifyToken;