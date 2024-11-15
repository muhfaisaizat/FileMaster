const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DetailProjectUtama extends Model {
    // toJSON() {
    //     return {
    //       ...this.get(),
    //       createdAt: this.createdAt ? this.createdAt.toISOString() : null,
    //       updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
    //       deletedAt: this.deletedAt ? this.deletedAt.toISOString() : null,
    //     };
    //   }
}

DetailProjectUtama.init({
    id_project_utama: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id_project',
        },
    },
    file: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    other_file: {
        type: DataTypes.ENUM('Form Pendaftaran.pdf','Informasi Pekerjaan.pdf','Form F3.pdf', 'Form F3.docx', 'Gambar.pdf', 'Analisa Struktur.pdf', 'Spek Teknis.pdf', 
                             'Perhitungan Air Hujan.pdf', 'Perhitungan Air Bersih.pdf', 'Perhitungan Air Kotor.pdf', 'Kajian dan Simak (SLF).pdf'),
        allowNull: true,
      },
    pekerjaan: {
        type: DataTypes.ENUM('F1', 'F2', 'F3', 'F4'),
        allowNull: false,
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
    modelName: 'DetailProjectUtama',
    tableName: 'detailprojectutamas',
    timestamps: true,
    paranoid: true,
});

module.exports = DetailProjectUtama;
