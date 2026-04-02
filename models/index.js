// models/index.js
const sequelize = require('../database');

// 1. Importar todos los modelos
const Usuario = require('./Usuario');
const TipoCancha = require('./TipoCancha');
const Cancha = require('./Cancha');
const Horario = require('./Horario');
const Reserva = require('./Reserva');
const Resena = require('./Resena');


TipoCancha.hasMany(Cancha, { foreignKey: 'tipo_id' });
Cancha.belongsTo(TipoCancha, { foreignKey: 'tipo_id' });

Cancha.hasMany(Horario, { foreignKey: 'cancha_id' });
Horario.belongsTo(Cancha, { foreignKey: 'cancha_id' });

Usuario.hasMany(Reserva, { foreignKey: 'usuario_id' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Horario.hasMany(Reserva, { foreignKey: 'horario_id' });
Reserva.belongsTo(Horario, { foreignKey: 'horario_id' });

Usuario.hasMany(Resena, { foreignKey: 'usuario_id' });
Resena.belongsTo(Usuario, { foreignKey: 'usuario_id' });

Cancha.hasMany(Resena, { foreignKey: 'cancha_id' });
Resena.belongsTo(Cancha, { foreignKey: 'cancha_id' });


module.exports = {
    sequelize,
    Usuario,
    TipoCancha,
    Cancha,
    Horario,
    Reserva,
    Resena
};