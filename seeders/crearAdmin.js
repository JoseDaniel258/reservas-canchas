const bcrypt = require('bcryptjs');
const { Usuario, sequelize } = require('../models'); // <-- Nota el ../ aquí

async function inyectarAdministrador() {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await Usuario.create({
            nombre: 'Super Administrador',
            email: 'admin@canchas.com',
            contrasena: hashedPassword,
            rol: 'admin'
        });

        console.log('✅ Usuario Administrador creado con éxito.');
        console.log('Email: admin@canchas.com');
        console.log('Contraseña: admin123');
        
    } catch (error) {
        console.error('❌ Error al crear administrador:', error.message);
    } finally {
        await sequelize.close();
    }
}

inyectarAdministrador();