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

module.exports = router;