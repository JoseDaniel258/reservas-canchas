const express = require('express');
const router = express.Router();

const { estaAutenticado, esAdmin } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');
const clientController = require('../controllers/clientController');

router.get('/client/Home', estaAutenticado, clientController.Home);
router.get('/client/listado_canchas', estaAutenticado, clientController.listado_cancha);
router.get('/client/cancha/:id/disponibilidad', estaAutenticado, clientController.verDisponibilidad);
router.post('/client/reservar/:horarioId', estaAutenticado, clientController.reservarCancha);
router.get('/client/historial_reservas', estaAutenticado, clientController.historialReservas);
router.post('/client/cancelar/:reservaId', estaAutenticado, clientController.cancelarReserva);
router.get('/client/resenas', estaAutenticado, clientController.reservasPasadas);

router.post('/client/resena/crear', estaAutenticado, clientController.crearResena);


router.get('/admin/dashboard', esAdmin, adminController.dashboard);

router.get('/admin/tipos', esAdmin, adminController.listarTipos);
router.post('/admin/tipos', esAdmin, adminController.crearTipo);

router.post('/admin/tipos/eliminar/:id', esAdmin, adminController.eliminarTipo);

router.get('/admin/canchas', esAdmin, adminController.listarCanchas);
router.post('/admin/canchas', esAdmin, adminController.crearCancha);
router.post('/admin/canchas/eliminar/:id', esAdmin, adminController.eliminarCancha);


router.get('/admin/horarios', esAdmin, adminController.listarHorarios);
router.post('/admin/horarios', esAdmin, adminController.crearHorario);
router.post('/admin/horarios/eliminar/:id', esAdmin, adminController.eliminarHorario);

router.get('/admin/reservas', esAdmin, adminController.listarReservas);
router.post('/admin/reservas/estado/:id', esAdmin, adminController.cambiarEstadoReserva);

router.get('/admin/resenas', esAdmin, adminController.listarResenas);
router.post('/admin/resenas/eliminar/:id', esAdmin, adminController.eliminarResena);


router.get('/admin/tipos/editar/:id', esAdmin, adminController.mostrarEditarTipo);
router.post('/admin/tipos/editar/:id', esAdmin, adminController.actualizarTipo);

router.get('/admin/canchas/editar/:id', esAdmin, adminController.mostrarEditarCancha);
router.post('/admin/canchas/editar/:id', esAdmin, adminController.actualizarCancha);

router.get('/admin/horarios/editar/:id', esAdmin, adminController.mostrarEditarHorario);
router.post('/admin/horarios/editar/:id', esAdmin, adminController.actualizarHorario);

module.exports = router;