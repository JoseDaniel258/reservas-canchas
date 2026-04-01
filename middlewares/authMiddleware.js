
exports.estaAutenticado = (req, res, next) => {
    if (req.session.usuarioId) {
        return next(); 
    }
    res.redirect('/login'); 
};

exports.esAdmin = (req, res, next) => {
    if (req.session.usuarioId && req.session.rol === 'admin') {
        return next();
    }
    res.redirect('/client/Home'); 
};