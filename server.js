const fs = require('fs')                    // подключение модуля для работы с файлами
const express = require('express')          // подключение фреймворка для создания веб-приложений и API
const bodyParser = require('body-parser')   // подключение модуля для работы с запросами POST, GET
const mongoose = require('mongoose')        // подключение модуля для работы с MongoDB
const appRoutes = require('./routes/app')

const app = express()

// подключение конфигурации ip и порта
const config = JSON.parse(fs.readFileSync('config.json', 'utf8')) //переменная config

// передача ip и порта из config.json
const ip = config.ip //переменная ip
const port = config.port //переменная port
const mongoDb = config.mongoDb //переменная port

app.set('view engine', 'ejs')               // подключаем шаблонизатор html страниц

app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(appRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// асинхронная функция для использования оператора await
async function start() {
    try {
        await mongoose.connect(mongoDb, {
            useNewUrlParser: true,
            useFindAndModify: false
        }) // подключение к базе данных
        app.listen(port, () => {
            console.log('Приложение API стартовала: ' + ip + ":" + port)
        }) // запуск сервера
    } catch (e) {
        console.log(e)
    }
}

start()