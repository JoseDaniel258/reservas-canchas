const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Reserva = sequelize.define('Reserva', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.ENUM('confirmada', 'cancelada'),
        defaultValue: 'confirmada',
        allowNull: false
    }
}, {
    tableName: 'reservas',
    timestamps: false
});

module.exports = Reserva;