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
    // El tipo_id lo creará automáticamente Sequelize con las relaciones en el siguiente paso
    precio_por_hora: {
        type: DataTypes.FLOAT, // Usamos FLOAT o DECIMAL para manejar precios
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