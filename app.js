const express = require('express');
const session = require('express-session'); // Nuevo: Manejo de sesiones
const app = express();
const port = 3000;

const { sequelize } = require('./models');

const indexRoutes = require('./routes/indexRoutes');

app.set('view engine', 'ejs');

// Middlewares para procesar datos de formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de Sesiones (Para mantener al usuario logueado)
app.use(session({
    secret: 'secreto_canchas_123', // En producción esto va en un archivo .env
    resave: false,
    saveUninitialized: false
}));

// Importar y usar las rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);

// Ruta de inicio por defecto
app.get('/', (req, res) => {
  res.redirect('/login'); // Redirigimos directo al login
});

app.use('/', indexRoutes);

sequelize.sync().then(() => {
  console.log('Base de datos conectada.');
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error al conectar a la BD:', error);
});