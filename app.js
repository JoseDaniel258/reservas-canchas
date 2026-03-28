const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./database');

let ejs = require('ejs');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World! sdfdssadsa');
});

app.get('/about', (req, res) => {
  res.sendFile(  __dirname + '/app.html');
});


sequelize.sync().then(() => {
  console.log('Connection has been established successfully.');
  app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});

