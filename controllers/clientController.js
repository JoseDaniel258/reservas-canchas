const { Cancha, TipoCancha } = require('../models');
const { Usuario,Reserva,Resena,Horario } = require('../models');
const { Op } = require('sequelize');

exports.listado_cancha = async (req, res) => {
    try {
        const canchas = await Cancha.findAll({
            include: [
                { model: TipoCancha },
                { 
                    model: Resena, 
                    include: [Usuario]
                }
            ]
        });
        const tipos = await TipoCancha.findAll();

        res.render('client/listado_canchas', { 
            canchas: canchas, 
            tipos: tipos,
            nombreclient: req.session.nombre 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar las canchas");
    }
};
exports.Home = async (req, res) => { 
    try {
        const usuario = await Usuario.findByPk(req.session.usuarioId, {
            include: [{
                model: Reserva,
                include: [{
                    model: Horario,
                    include: [Cancha]
                }]
            }]
        });

        res.render('client/Home', {
            usuario: usuario,
            nombreclient: req.session.nombre 
        });
    } catch (error) {
        console.error('Error al cargar el Home:', error);
        res.send('Hubo un error al cargar tu perfil.');
    }
};


exports.verDisponibilidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { fecha } = req.query;

        const cancha = await Cancha.findByPk(id);
        
        const horarios = await Horario.findAll({
            where: {
                cancha_id: id,
                fecha: fecha || new Date().toISOString().split('T')[0],
                disponible: true
            },
            order: [['hora_inicio', 'ASC']]
        });

        res.render('client/disponibilidad', {
            cancha,
            horarios,
            fechaSeleccionada: fecha,
            nombreclient: req.session.nombre
        });
    } catch (error) {
        console.error(error);
        res.send('Error al buscar disponibilidad.');
    }
};

exports.reservarCancha = async (req, res) => {
    try {
        const { horarioId } = req.params;
        const usuarioId = req.session.usuarioId; 

        const horario = await Horario.findByPk(horarioId);

        if (!horario) {
            return res.status(404).send('El horario no existe.');
        }

        if (!horario.disponible) {
            return res.send('Lo sentimos, este horario ya ha sido reservado por alguien más.');
        }


        await Reserva.create({
            usuario_id: usuarioId,
            horario_id: horarioId,
            estado: 'confirmada'
        });

        // 3. Marcamos el horario como NO disponible
        horario.disponible = false;
        await horario.save();

        // 4. Redirigimos al Home o a una lista de mis reservas
        res.redirect('/client/Home'); 

    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).send('Hubo un error al procesar tu reserva.');
    }
};

exports.historialReservas = async (req, res) => {
    try {
        const usuarioId = req.session.usuarioId;
        
        const ahora = new Date();
        const hoy = ahora.toISOString().split('T')[0];
        const horaActual = ahora.getHours().toString().padStart(2, '0') + ':' + 
                           ahora.getMinutes().toString().padStart(2, '0');

        const reservas = await Reserva.findAll({
            where: { usuario_id: usuarioId },
            include: [{
                model: Horario,
                include: [Cancha]
            }],
            order: [[Horario, 'fecha', 'DESC'], [Horario, 'hora_inicio', 'DESC']]
        });

        res.render('client/historial_reservas', {
            reservas: reservas,
            nombreclient: req.session.nombre,
            hoy, 
            horaActual 
        });

    } catch (error) {
        console.error('Error al cargar el historial', error);
        res.status(500).send('Hubo un error al cargar el historial');
    }
};


exports.cancelarReserva = async (req, res) => {
    try {
        const { reservaId } = req.params;

        const reserva = await Reserva.findByPk(reservaId, {
            include: [Horario]
        });

        if (!reserva) {
            return res.status(404).send('Reserva no encontrada.');
        }

        reserva.estado = 'cancelada';
        await reserva.save();

         if (reserva.Horario) {
            reserva.Horario.disponible = true;
            await reserva.Horario.save();
        }

         res.redirect('/client/historial_reservas');

    } catch (error) {
        console.error('Error al cancelar:', error);
        res.status(500).send('Error al procesar la cancelación.');
    }
};


exports.verResenasCancha = async (req, res) => {
    try {
        const { id } = req.params;
        
         const cancha = await Cancha.findByPk(id, {
            include: [{
                model: Resena,
                include: [Usuario] 
            }]
        });

        if (!cancha) {
            return res.status(404).send('Cancha no encontrada');
        }

        res.render('client/ver_resenas', {
            cancha: cancha,
            nombreclient: req.session.nombre
        });
    } catch (error) {
        console.error('Error al cargar reseñas de la cancha:', error);
        res.status(500).send('Hubo un error al cargar las reseñas.');
    }
};


exports.reservasPasadas = async (req, res) => {
    try {
        const usuarioId = req.session.usuarioId;
        
         const ahora = new Date();
        const hoy = ahora.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const horaActual = ahora.getHours().toString().padStart(2, '0') + ':' + 
                           ahora.getMinutes().toString().padStart(2, '0'); // Formato HH:MM

        const reservas = await Reserva.findAll({
            where: { 
                usuario_id: usuarioId,
                estado: 'confirmada' 
            },
            include: [{
                model: Horario,
                where: {
                    [Op.or]: [
                        { fecha: { [Op.lt]: hoy } },  
                        { 
                            [Op.and]: [
                                { fecha: hoy }, 
                                { hora_fin: { [Op.lt]: horaActual } }
                             ]
                        }
                    ]
                },
                include: [Cancha]
            }],
            order: [[Horario, 'fecha', 'DESC']]
        });

        res.render('client/historial_resena', {
            reservas: reservas,
            nombreclient: req.session.nombre
        });
    } catch (error) {
        console.error('Error al cargar reservas pasadas:', error);
        res.status(500).send('Error al procesar la solicitud.');
    }
};

exports.crearResena = async (req, res) => {
    try {
        const { cancha_id, calificacion, comentario } = req.body;
        const usuario_id = req.session.usuarioId;

        if (!cancha_id || !calificacion) {
            return res.status(400).send('Faltan datos obligatorios.');
        }

        await Resena.create({
            usuario_id,
            cancha_id,
            calificacion,
            comentario
        });

         res.redirect('/client/listado_canchas'); 
    } catch (error) {
        console.error('Error al guardar reseña:', error);
        res.status(500).send('Error interno al guardar la reseña.');
    }
};