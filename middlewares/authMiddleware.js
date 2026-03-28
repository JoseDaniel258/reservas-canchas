// middlewares/authMiddleware.js

// Guardia 1: Verifica si el usuario ha iniciado sesión (para cualquier rol)
exports.estaAutenticado = (req, res, next) => {
    if (req.session.usuarioId) {
        return next(); // Si tiene sesión, lo dejamos pasar
    }
    res.redirect('/login'); // Si no, lo mandamos a que inicie sesión
};

// Guardia 2: Verifica si el usuario logueado tiene el rol de Administrador
exports.esAdmin = (req, res, next) => {
    // Verificamos que esté logueado y además sea admin
    if (req.session.usuarioId && req.session.rol === 'admin') {
        return next(); // Lo dejamos pasar al panel de administración
    }
    // Si es un cliente intentando entrar a zona de admin, lo regresamos a su zona
    res.redirect('/canchas'); 
};