const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('.');

const PayslipDetail = sequelize.define('payslip_details', {
  payslip_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  reference_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  hour: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  total: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_by: {
    type: DataTypes.UUID,
    allowNull: true,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

PayslipDetail.beforeCreate((object) => {
  object.id = uuidv4();
});

module.exports = PayslipDetail;
