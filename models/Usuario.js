const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contrasena: { // Usamos 'contrasena' sin la 'ñ' por buenas prácticas en código
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('admin', 'cliente'),
        defaultValue: 'cliente',
        allowNull: false
    }
}, {
    tableName: 'usuarios',
    timestamps: false // Lo mantenemos simple para no generar columnas extra de fecha
});

module.exports = Usuario;