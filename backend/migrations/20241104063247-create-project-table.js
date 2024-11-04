'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Project', {
      id_project: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nama_project: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kategori: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      nama_pengaju_project: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jabatan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      instansi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      no_telp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      provinsi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kabupaten: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kecamatan_desa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), // Untuk menyimpan waktu saat data dibuat
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'), // Untuk menyimpan waktu saat data diperbarui
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true, // Kolom ini bisa null saat data belum dihapus
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Project');
  }
};
