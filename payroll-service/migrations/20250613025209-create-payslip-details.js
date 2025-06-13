'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('payslip_details', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      payslip_id: {
        type: Sequelize.UUID,
        references: {
          model: 'payslips',
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      reference_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      reference_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      hour: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      total: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('payslip_details');
  }
};
