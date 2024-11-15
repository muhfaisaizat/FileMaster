const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Project extends Model {}

Project.init({
    id_project: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_project: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kategori: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    nama_pengaju_project: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jabatan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instansi_organisasi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_telp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat_lengkap: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provinsi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kabupaten_kota: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kecamatan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_desa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    archive: {
        type: DataTypes.ENUM('Aktif', 'Arsip'),
        allowNull: false,
        defaultValue: 'Aktif'
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
    },
}, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
    paranoid: true,
});

module.exports = Project;
