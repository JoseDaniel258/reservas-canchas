const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Reserva = sequelize.define('Reserva', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // usuario_id y horario_id se crearán con las relaciones
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