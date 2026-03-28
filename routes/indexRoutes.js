// routes/indexRoutes.js
const express = require('express');
const router = express.Router();

// Importamos nuestros guardias de seguridad
const { estaAutenticado, esAdmin } = require('../middlewares/authMiddleware');

// ==========================================
// ZONA DE CLIENTES (Requiere estar logueado)
// ==========================================
router.get('/canchas', estaAutenticado, (req, res) => {
    // Por ahora solo mandamos un texto, luego conectaremos la vista EJS
    res.send(`<h1>Bienvenido Cliente: ${req.session.nombre}</h1> <p>Aquí verás el listado de canchas.</p> <a href="/logout">Cerrar Sesión</a>`);
});

// ==========================================
// ZONA DE ADMIN (Requiere ser Administrador)
// ==========================================
router.get('/admin/dashboard', esAdmin, (req, res) => {
    // Solo un admin verá esto
    res.send(`<h1>Panel de Control Admin</h1> <p>Bienvenido jefe: ${req.session.nombre}</p> <a href="/logout">Cerrar Sesión</a>`);
});

module.exports = router;