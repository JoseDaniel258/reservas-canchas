const { Sequelize } = require('sequelize');

// Configuramos la conexión a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Aquí se creará automáticamente el archivo de la BD
});

module.exports = sequelize; 