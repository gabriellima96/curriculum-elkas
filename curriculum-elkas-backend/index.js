const app = require('express')();
const mongoose = require('mongoose');

const configDb = require('./config/database');

mongoose.connect(
  configDb.url,
  configDb.config,
);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(8080);
