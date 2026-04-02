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

app.use(session({
    secret: 'secreto_canchas_123', 
     resave: false,
    saveUninitialized: false
}));

const authRoutes = require('./routes/authRoutes');
app.use('/', authRoutes);


app.get('/', (req, res) => {
  res.redirect('/login'); 
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