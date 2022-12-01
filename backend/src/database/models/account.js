module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    balance: DataTypes.DECIMAL,
  });
  return User;
};