const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DetailProjectPendukung extends Model {
    toJSON() {
        return {
          ...this.get(),
          createdAt: this.createdAt ? this.createdAt.toISOString() : null,
          updatedAt: this.updatedAt ? this.updatedAt.toISOString() : null,
          deletedAt: this.deletedAt ? this.deletedAt.toISOString() : null,
        };
      }
}

DetailProjectPendukung.init({
    id_project_pendukung: {
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
        type: DataTypes.STRING,
        allowNull: true,
      },
    pekerjaan: {
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
    },
}, {
    sequelize,
    modelName: 'DetailProjectPendukung',
    tableName: 'detailprojectpendukungs',
    timestamps: true,
    paranoid: true,
});

module.exports = DetailProjectPendukung;
