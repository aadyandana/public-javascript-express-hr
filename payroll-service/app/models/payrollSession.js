const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('.');

const PayrollSessionStatusCode = require('../utils/enums/PayrollSessionStatusCode');

const PayrollSession = sequelize.define('payroll_sessions', {
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: PayrollSessionStatusCode.NEW,
  },
  total: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: null,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

PayrollSession.beforeCreate((object) => {
  object.id = uuidv4();
});

module.exports = PayrollSession;
