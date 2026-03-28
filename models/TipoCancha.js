const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const TipoCancha = sequelize.define('TipoCancha', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tipos_cancha',
    timestamps: false
});

module.exports = TipoCancha;