const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');

exports.mostrarRegistro = (req, res) => {
    res.render('auth/registro'); 
};

exports.registrar = async (req, res) => {
    try {
        const { nombre, email, contrasena } = req.body;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);

        await Usuario.create({
            nombre: nombre,
            email: email,
            contrasena: hashedPassword,
            rol: 'cliente' 
        });

        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.send('Error al registrar el usuario. El correo podría ya estar en uso.');
    }
};

exports.mostrarLogin = (req, res) => {
    res.render('auth/login');
};

exports.login = async (req, res) => {
    try {
        const { email, contrasena } = req.body;

        const usuario = await Usuario.findOne({ where: { email: email } });
        if (!usuario) {
            return res.send('Usuario no encontrado');
        }

        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!contrasenaValida) {
            return res.send('Contraseña incorrecta');
        }

        req.session.usuarioId = usuario.id;
        req.session.rol = usuario.rol;
        req.session.nombre = usuario.nombre;

        if (usuario.rol === 'admin') {
            res.redirect('/admin/dashboard');
        } else {
            res.redirect('/client/Home');
        }

    } catch (error) {
        console.error(error);
        res.send('Error al iniciar sesión');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};