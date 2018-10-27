const app = require('express')();
const mongoose = require('mongoose');

const requireDir = require('require-dir');
const configDb = require('./config/database');

mongoose.connect(
  configDb.url,
  configDb.config,
);

requireDir(configDb.modelPath);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(8080);
