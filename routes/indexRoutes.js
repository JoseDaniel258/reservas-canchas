const express = require('express');
const router = express.Router();

const { estaAutenticado, esAdmin } = require('../middlewares/authMiddleware');
//   admin
const adminController = require('../controllers/adminController');
//client
const clientController = require('../controllers/clientController');

// ==========================================
// ZONA DE CLIENTES (Requiere estar logueado)
// ==========================================
router.get('/client/Home', estaAutenticado, clientController.Home);

router.get('/client/listado_canchas', estaAutenticado, clientController.listado_cancha);
router.get('/client/cancha/:id/disponibilidad', estaAutenticado, clientController.verDisponibilidad);
router.post('/client/reservar/:horarioId', estaAutenticado, clientController.reservarCancha);
router.get('/client/historial_reservas', estaAutenticado, clientController.historialReservas);
router.post('/client/cancelar/:reservaId', estaAutenticado, clientController.cancelarReserva);
router.get('/client/resenas', estaAutenticado, clientController.reservasPasadas);
router.get('/client/cancha/:id/resenas', estaAutenticado, clientController.verResenasCancha);
router.post('/client/resena/crear', estaAutenticado, clientController.crearResena);
// ==========================================
// ZONA DE ADMIN (Requiere ser Administrador)
// ==========================================
// Reemplazamos el res.send por el controlador real
router.get('/admin/dashboard', esAdmin, adminController.dashboard);

// Rutas para Tipos de Cancha
router.get('/admin/tipos', esAdmin, adminController.listarTipos);
router.post('/admin/tipos', esAdmin, adminController.crearTipo);

// Eliminar un tipo de cancha
router.post('/admin/tipos/eliminar/:id', esAdmin, adminController.eliminarTipo);

// Rutas para Canchas
router.get('/admin/canchas', esAdmin, adminController.listarCanchas);
router.post('/admin/canchas', esAdmin, adminController.crearCancha);
router.post('/admin/canchas/eliminar/:id', esAdmin, adminController.eliminarCancha);


// Rutas para Horarios
router.get('/admin/horarios', esAdmin, adminController.listarHorarios);
router.post('/admin/horarios', esAdmin, adminController.crearHorario);
router.post('/admin/horarios/eliminar/:id', esAdmin, adminController.eliminarHorario);

// Rutas para Reservas
router.get('/admin/reservas', esAdmin, adminController.listarReservas);
router.post('/admin/reservas/estado/:id', esAdmin, adminController.cambiarEstadoReserva);

// Rutas para Reseñas
router.get('/admin/resenas', esAdmin, adminController.listarResenas);
router.post('/admin/resenas/eliminar/:id', esAdmin, adminController.eliminarResena);


// Rutas para EDITAR Tipos
router.get('/admin/tipos/editar/:id', esAdmin, adminController.mostrarEditarTipo);
router.post('/admin/tipos/editar/:id', esAdmin, adminController.actualizarTipo);

// Rutas para EDITAR Canchas
router.get('/admin/canchas/editar/:id', esAdmin, adminController.mostrarEditarCancha);
router.post('/admin/canchas/editar/:id', esAdmin, adminController.actualizarCancha);

// Rutas para EDITAR Horarios
router.get('/admin/horarios/editar/:id', esAdmin, adminController.mostrarEditarHorario);
router.post('/admin/horarios/editar/:id', esAdmin, adminController.actualizarHorario);

module.exports = router;