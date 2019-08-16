const express = require('express'); // подключение фреймворка для создания веб-приложений и API
const bodyParser = require('body-parser'); // подключение модуля для работы с запросами POST, GET
const appRoutes = require('./routes/router');

const app = express();

app.set('view engine', 'ejs'); // подключаем шаблонизатор html страниц

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(appRoutes);
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
