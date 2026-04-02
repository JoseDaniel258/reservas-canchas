const { DataTypes } = require('sequelize');
const sequelize = require('../database'); 

const Horario = sequelize.define('Horario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY, 
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME, 
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

//mappeo objeto relacional 