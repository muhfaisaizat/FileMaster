'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetailProjectPendukungs', {
      id_project_pendukung: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      id_project: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects', // Nama tabel yang direferensikan
          key: 'id_project',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      file: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      other_file: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pekerjaan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  references: {
    model: 'projects', // Nama tabel yang direferensikan
    key: 'id_project',
  },
  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('DetailProjectPendukungs');
  }
};