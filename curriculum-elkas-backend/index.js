require('dotenv').config();

const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const configDb = require('./config/database');
const swaggerDocument = require('./config/swaggerDocument');

mongoose.connect(
  configDb.url,
  configDb.config,
);
requireDir(configDb.modelPath);

app.use(bodyParser.json());
app.use(cors({ methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'] }));
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument.json));
app.use('/api', require('./app/routes'));

app.use('/', (req, res) => {
  res.redirect('/api/docs');
});

app.listen(3000);
