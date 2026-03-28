const { Cancha, TipoCancha } = require('../models');

exports.dashboard = async (req, res) => {
    try {
        // Traemos todas las canchas incluyendo el nombre de su "Tipo"
        const canchas = await Cancha.findAll({
            include: [{ model: TipoCancha }]
        });
        
        // Traemos todos los tipos de cancha para el formulario de crear nueva
        const tipos = await TipoCancha.findAll();

        // Mandamos esos datos a la vista EJS (que crearemos en el siguiente paso)
        res.render('admin/dashboard', { 
            canchas: canchas, 
            tipos: tipos,
            nombreAdmin: req.session.nombre 
        });

    } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        res.send('Hubo un error al cargar el panel de control.');
    }
};