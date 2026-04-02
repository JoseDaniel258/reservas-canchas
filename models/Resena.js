const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Resena = sequelize.define('Resena', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'resenas',
    timestamps: false
});

module.exports = Resena;