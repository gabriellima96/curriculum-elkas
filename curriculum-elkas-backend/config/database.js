const path = require('path');

module.exports = {
  url: process.env.DATABASE_URL,
  config: { useNewUrlParser: true, useCreateIndex: true },
  modelPath: path.resolve('app', 'models'),
};
