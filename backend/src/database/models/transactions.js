module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    debitedAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id',
      },
    },
    creditedAccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id',
      },
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'transactions',
    timestamps: false,
  }
  );

  Transaction.associate = (models) => {
    models.Transaction.belongsTo(models.Account,
      {
        as: 'debitedAccount',
        through: Transaction,
        foreignKey: 'debitedAccountId'
      });
    models.Transaction.belongsTo(models.Account,
      {
        as: 'creditedAccount',
        through: Transaction,
        foreignKey: 'creditedAccountId'
      });
  };

  return Transaction;
};