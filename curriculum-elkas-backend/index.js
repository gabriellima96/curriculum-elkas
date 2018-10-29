require('dotenv').config();

const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const requireDir = require('require-dir');
const cors = require('cors');
const configDb = require('./config/database');

mongoose.connect(
  configDb.url,
  configDb.config,
);

requireDir(configDb.modelPath);

app.use(bodyParser.json());
app.use(cors());
app.use('/api', require('./app/routes'));

app.listen(8080);
