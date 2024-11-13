'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetailProjectUtamas', {
      id_project_utama: {
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
        type: Sequelize.ENUM('Form F3.pdf', 'Form F3.docx', 'Gambar.pdf', 'Analisa Struktur.pdf', 'Spek Teknis.pdf', 
                             'Perhitungan Air Hujan.pdf', 'Perhitungan Air Bersih.pdf', 'Perhitungan Air Kotor.pdf', 'Kajian dan Simak (SLF).pdf'),
        allowNull: true,
      },
      pekerjaan: {
        type: Sequelize.ENUM('F1', 'F2', 'F3', 'F4'),
        allowNull: false,
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
    await queryInterface.dropTable('DetailProjectUtamas');
  }
};