// models/index.js
const sequelize = require('../database');

// 1. Importar todos los modelos
const Usuario = require('./Usuario');
const TipoCancha = require('./TipoCancha');
const Cancha = require('./Cancha');
const Horario = require('./Horario');
const Reserva = require('./Reserva');
const Resena = require('./Resena');

// 2. Definir TODAS las Relaciones

// Tipo de Cancha -> Canchas (1 a N)
TipoCancha.hasMany(Cancha, { foreignKey: 'tipo_id' });
Cancha.belongsTo(TipoCancha, { foreignKey: 'tipo_id' });

// Cancha -> Horarios (1 a N)
Cancha.hasMany(Horario, { foreignKey: 'cancha_id' });
Horario.belongsTo(Cancha, { foreignKey: 'cancha_id' });

// Usuario -> Reservas (1 a N)
Usuario.hasMany(Reserva, { foreignKey: 'usuario_id' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Horario -> Reservas (1 a N) - Permite tener historial si una reserva se cancela y se crea otra
Horario.hasMany(Reserva, { foreignKey: 'horario_id' });
Reserva.belongsTo(Horario, { foreignKey: 'horario_id' });

// Usuario -> Reseñas (1 a N)
Usuario.hasMany(Resena, { foreignKey: 'usuario_id' });
Resena.belongsTo(Usuario, { foreignKey: 'usuario_id' });

// Cancha -> Reseñas (1 a N)
Cancha.hasMany(Resena, { foreignKey: 'cancha_id' });
Resena.belongsTo(Cancha, { foreignKey: 'cancha_id' });


// 3. Exportar todo
module.exports = {
    sequelize,
    Usuario,
    TipoCancha,
    Cancha,
    Horario,
    Reserva,
    Resena
};