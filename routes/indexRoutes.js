const express = require('express');
const router = express.Router();

const { estaAutenticado, esAdmin } = require('../middlewares/authMiddleware');
// Importamos el nuevo controlador del admin
const adminController = require('../controllers/adminController');

// ==========================================
// ZONA DE CLIENTES (Requiere estar logueado)
// ==========================================
router.get('/canchas', estaAutenticado, (req, res) => {
    res.send(`<h1>Bienvenido Cliente: ${req.session.nombre}</h1> <p>Aquí verás el listado de canchas.</p> <a href="/logout">Cerrar Sesión</a>`);
});

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

module.exports = router;