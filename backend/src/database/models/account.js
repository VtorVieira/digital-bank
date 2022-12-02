module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    tableName: 'accounts',
    timestamps: false,
  });

  Account.associate = (models) => {
    Account.hasOne(models.User, { foreignKey: 'id' });
  };

  return Account;
};