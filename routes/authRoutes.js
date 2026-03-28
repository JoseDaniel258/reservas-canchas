const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas para el Registro
router.get('/registro', authController.mostrarRegistro);
router.post('/registro', authController.registrar);

// Rutas para el Login
router.get('/login', authController.mostrarLogin);
router.post('/login', authController.login);

// Ruta para cerrar sesión
router.get('/logout', authController.logout);

module.exports = router;