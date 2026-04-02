const { Sequelize } = require('sequelize');

// Configuramos la conexión a SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' 
});

module.exports = sequelize; 