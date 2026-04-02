const { Cancha, TipoCancha } = require('../models');

exports.dashboard = async (req, res) => {
    try {
        const canchas = await Cancha.findAll({
            include: [{ model: TipoCancha }]
        });
        

        const tipos = await TipoCancha.findAll();


        res.render('admin/dashboard', { 
            canchas: canchas, 
            tipos: tipos,
            nombreAdmin: req.session.nombre 
        });

    } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        res.send('Hubo un error al cargar el panel de control.');
    }
};




exports.listarTipos = async (req, res) => {
    try {
        const tipos = await TipoCancha.findAll();
        res.render('admin/tipos', { 
            tipos: tipos, 
            nombreAdmin: req.session.nombre 
        });
    } catch (error) {
        console.error(error);
        res.send('Error al cargar la página de tipos de cancha.');
    }
};


exports.crearTipo = async (req, res) => {
    try {
        const { nombre } = req.body;
        await TipoCancha.create({ nombre: nombre });
        
        // Si todo sale bien, recargamos la página para ver el nuevo registro en la tabla
        res.redirect('/admin/tipos');
    } catch (error) {
        console.error(error);
        res.send('Error al crear el tipo de cancha.');
    }
};


exports.eliminarTipo = async (req, res) => {
    try {
        await TipoCancha.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/tipos');
    } catch (error) {
        console.error(error);
        res.send('Error al eliminar. Asegúrate de que no haya canchas usando este tipo primero.');
    }
};


exports.listarCanchas = async (req, res) => {
    try {

        const canchas = await Cancha.findAll({ include: [{ model: TipoCancha }] });

        const tipos = await TipoCancha.findAll(); 
        res.render('admin/canchas', { canchas, tipos, nombreAdmin: req.session.nombre });
    } catch (error) {
        console.error(error);
        res.send('Error al cargar la página de canchas.');
    }
};

exports.crearCancha = async (req, res) => {
    try {
        const { nombre, tipo_id, precio_por_hora } = req.body;
        await Cancha.create({ nombre, tipo_id, precio_por_hora });
        res.redirect('/admin/canchas');
    } catch (error) {
        console.error(error);
        res.send('Error al crear la cancha.');
    }
};

exports.eliminarCancha = async (req, res) => {
    try {
        await Cancha.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/canchas');
    } catch (error) {
        console.error(error);
        res.send('Error al eliminar la cancha.');
    }
};


exports.listarHorarios = async (req, res) => {
    try {
        const { Horario } = require('../models');

        const horarios = await Horario.findAll({ include: [{ model: Cancha }] });
        const canchas = await Cancha.findAll(); 
        res.render('admin/horarios', { horarios, canchas, nombreAdmin: req.session.nombre });
    } catch (error) {
        console.error(error);
        res.send('Error al cargar horarios.');
    }
};

exports.crearHorario = async (req, res) => {
    try {
        const { Horario } = require('../models');
        const { cancha_id, fecha, hora_inicio, hora_fin } = req.body;
        const horarioExistente = await Horario.findOne({
            where: {
                cancha_id: cancha_id,
                fecha: fecha,
                hora_inicio: hora_inicio,
                
            }
        });

        
        if (horarioExistente) {
            return res.send(`
                <div style="text-align: center; margin-top: 50px; font-family: Arial;">
                    <h2 style="color: red;">⚠️ Error de duplicado</h2>
                    <p>Ya abriste un horario a las <b>${hora_inicio}</b> para esta cancha en la fecha <b>${fecha}</b>.</p>
                    <p>Por favor, revisa la tabla de horarios.</p>
                    <a href="/admin/horarios" style="padding: 10px 20px; background: #333; color: white; text-decoration: none; border-radius: 5px;">Volver atrás</a>
                </div>
            `);
        }

        await Horario.create({ cancha_id, fecha, hora_inicio, hora_fin });
        res.redirect('/admin/horarios');
        
    } catch (error) {
        console.error(error);
        res.send('Error al crear el horario.');
    }
};

exports.eliminarHorario = async (req, res) => {
    try {
        const { Horario } = require('../models');
        await Horario.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/horarios');
    } catch (error) {
        console.error(error);
        res.send('Error al eliminar el horario.');
    }
};

exports.listarReservas = async (req, res) => {
    try {
        const { Reserva, Usuario, Horario, Cancha } = require('../models');
        
        const reservas = await Reserva.findAll({
            include: [
                { model: Usuario },
                { 
                    model: Horario, 
                    include: [{ model: Cancha }] 
                }
            ],
            order: [['id', 'DESC']] 
        });
        
        res.render('admin/reservas', { reservas, nombreAdmin: req.session.nombre });
    } catch (error) {
        console.error(error);
        res.send('Error al cargar las reservas.');
    }
};

exports.cambiarEstadoReserva = async (req, res) => {
    try {
        const { Reserva, Horario } = require('../models');
        const { estado } = req.body;
        
        const reserva = await Reserva.findByPk(req.params.id);

        if (reserva) {
            reserva.estado = estado;
            await reserva.save();

            const horario = await Horario.findByPk(reserva.horario_id);
            if (horario) {
                if (estado === 'cancelada') {
                    horario.disponible = true;
                } else if (estado === 'confirmada') {
                    horario.disponible = false;
                }
                await horario.save();
            }
        }
        res.redirect('/admin/reservas');
    } catch (error) {
        console.error(error);
        res.send('Error al cambiar el estado de la reserva.');
    }
};

exports.listarResenas = async (req, res) => {
    try {
        const { Resena, Usuario, Cancha } = require('../models');
        const resenas = await Resena.findAll({
            include: [{ model: Usuario }, { model: Cancha }],
            order: [['id', 'DESC']]
        });
        res.render('admin/resenas', { resenas, nombreAdmin: req.session.nombre });
    } catch (error) {
        console.error(error);
        res.send('Error al cargar las reseñas.');
    }
};

exports.eliminarResena = async (req, res) => {
    try {
        const { Resena } = require('../models');
        await Resena.destroy({ where: { id: req.params.id } });
        res.redirect('/admin/resenas');
    } catch (error) {
        console.error(error);
        res.send('Error al eliminar la reseña.');
    }
};

exports.mostrarEditarTipo = async (req, res) => {
    try {
        const { TipoCancha } = require('../models');
        const tipo = await TipoCancha.findByPk(req.params.id);
        res.render('admin/editar-tipo', { tipo, nombreAdmin: req.session.nombre });
    } catch (error) {
        console.error(error); res.send('Error al cargar pantalla de edición.');
    }
};

exports.actualizarTipo = async (req, res) => {
    try {
        const { TipoCancha } = require('../models');
        await TipoCancha.update({ nombre: req.body.nombre }, { where: { id: req.params.id } });
        res.redirect('/admin/tipos');
    } catch (error) {
        console.error(error); res.send('Error al actualizar.');
    }
};

exports.mostrarEditarCancha = async (req, res) => {
    try {
        const { Cancha, TipoCancha } = require('../models');
        const cancha = await Cancha.findByPk(req.params.id);
        const tipos = await TipoCancha.findAll();
        res.render('admin/editar-cancha', { cancha, tipos, nombreAdmin: req.session.nombre });
    } catch (error) {
        console.error(error); res.send('Error al cargar pantalla de edición.');
    }
};

exports.actualizarCancha = async (req, res) => {
    try {
        const { Cancha } = require('../models');
        const { nombre, tipo_id, precio_por_hora } = req.body;
        await Cancha.update({ nombre, tipo_id, precio_por_hora }, { where: { id: req.params.id } });
        res.redirect('/admin/canchas');
    } catch (error) {
        console.error(error); res.send('Error al actualizar.');
    }
};

exports.mostrarEditarHorario = async (req, res) => {
    try {
        const { Horario, Cancha } = require('../models');
        const horario = await Horario.findByPk(req.params.id);
        const canchas = await Cancha.findAll();
        
        res.render('admin/editar-horario', { 
            horario, 
            canchas, 
            nombreAdmin: req.session.nombre 
        });
    } catch (error) {
        console.error(error); 
        res.send('Error al cargar la pantalla de edición de horario.');
    }
};

exports.actualizarHorario = async (req, res) => {
    try {
        const { Horario } = require('../models');
        const { Op } = require('sequelize'); 
        const { cancha_id, fecha, hora_inicio, hora_fin } = req.body;
        
        const horarioExistente = await Horario.findOne({
            where: {
                cancha_id: cancha_id,
                fecha: fecha,
                hora_inicio: hora_inicio,
                id: { [Op.ne]: req.params.id } 
            }
        });

        if (horarioExistente) {
            return res.send(`
                <div style="text-align: center; margin-top: 50px; font-family: Arial;">
                    <h2 style="color: red;">⚠️ Choque de horarios</h2>
                    <p>Ya existe OTRO horario a las <b>${hora_inicio}</b> para esta cancha en la fecha <b>${fecha}</b>.</p>
                    <a href="/admin/horarios" style="padding: 10px 20px; background: #333; color: white; text-decoration: none; border-radius: 5px;">Volver a Horarios</a>
                </div>
            `);
        }

        await Horario.update(
            { cancha_id, fecha, hora_inicio, hora_fin }, 
            { where: { id: req.params.id } }
        );
        res.redirect('/admin/horarios');

    } catch (error) {
        console.error(error); 
        res.send('Error al actualizar el horario.');
    }
};