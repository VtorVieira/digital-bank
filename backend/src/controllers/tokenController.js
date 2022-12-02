const verifyToken = require('../utils/verifyToken');

const tokenControllers = {
  validateUser: async (req, res) => {
    const { authorization } = req.headers;
    const user = verifyToken(authorization);
    res.status(200).json(user);
  },
};

module.exports = tokenControllers;