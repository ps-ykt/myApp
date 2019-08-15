const config = require('./config');
const mongoose = require('mongoose'); // подключение модуля для работы с MongoDB

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);

    mongoose.connection
      .on('error', err => reject(err))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(config.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false
    });
  });
};
