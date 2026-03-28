const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Horario = sequelize.define('Horario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // cancha_id se creará con las relaciones
    fecha: {
        type: DataTypes.DATEONLY, // Solo fecha (YYYY-MM-DD)
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME, // Solo hora (HH:MM:SS)
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    tableName: 'horarios',
    timestamps: false
});

module.exports = Horario;