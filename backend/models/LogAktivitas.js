const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class LogAktivitas extends Model {}

LogAktivitas.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_project: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects', // Nama tabel yang direferensikan
        key: 'id_project',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Nama tabel yang direferensikan
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    aktivitas: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    keterangan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'LogAktivitas',
    tableName: 'LogAktivitas',
    timestamps: true,
    paranoid: true, // Untuk mengaktifkan soft delete
  }
);

module.exports = LogAktivitas;
