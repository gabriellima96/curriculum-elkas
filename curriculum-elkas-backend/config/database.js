const path = require('path');

module.exports = {
  url: 'mongodb://localhost:27017/curriculumelkasdb',
  config: { useNewUrlParser: true, useCreateIndex: true },
  modelPath: path.resolve('app', 'models'),
};
