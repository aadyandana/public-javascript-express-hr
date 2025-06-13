const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('.');

const ATTENDANCE_STATUS_CODE = require('../utils/enums/AttendanceStatusCode');

const Attendance = sequelize.define('attendances', {
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: ATTENDANCE_STATUS_CODE.NEW,
  },
  payroll_session_id: {
    type: DataTypes.UUID,
    allowNull: true,
    defaultValue: null,
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

Attendance.beforeCreate((object) => {
  object.id = uuidv4();

  object.created_by = object.user_id;
  object.updated_by = object.user_id;
});

module.exports = Attendance;
