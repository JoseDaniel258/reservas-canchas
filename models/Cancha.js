const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cancha = sequelize.define('Cancha', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio_por_hora: {
        type: DataTypes.FLOAT, 
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('activa', 'inactiva'),
        defaultValue: 'activa',
        allowNull: false
    }
}, {
    tableName: 'canchas',
    timestamps: false
});

module.exports = Cancha;