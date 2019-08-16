const { Router } = require('express');
const Category = require('../models/CreateCategory');
const Service = require('../models/CreateService');
const router = Router();

// подключаем главную страницу
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная страница',
    isIndex: true
  });
});

// подключаем раздел категории
router.get('/category', async (req, res) => {
  const categories = await Category.find({});
  res.render('category', {
    title: 'Категории',
    isCategory: true,
    categories
  });
});

// подключаем раздел услуги
router.get('/service', async (req, res) => {
  const services = await Service.find({});
  res.render('service', {
    title: 'Услуги',
    isService: true,
    services
  });
});

// подключаем страницу создания категории
router.get('/create_category', (req, res) => {
  res.render('create_category', {
    title: 'Создать категорию',
    isCreateCategory: true
  });
});

// подключаем страницу создания услуги
router.get('/create_service', async (req, res) => {
  const categories = await Category.find({});
  res.render('create_service', {
    title: 'Создать услугу',
    isCreateService: true,
    categories
  });
});

// добавляем новую категорию
router.post('/create_category', async (req, res) => {
  const category = new Category({
    name: req.body.name // реструктуризация body в переменную
  });

  await category
    .save()
    .then(post =>
      console.log(
        `Создана новая запись ${post.name} в categories с ID: ${post._id}`
      )
    ); // вывод записи в консоль
  res.redirect('/category');
});

// добавляем новую услугу
router.post('/create_service', async (req, res) => {
  const service = new Service({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price // реструктуризация body в переменную
  });

  await service
    .save()
    .then(post =>
      console.log(
        `Создана новая запись ${post.name} в services с ID: ${post._id}`
      )
    ); // вывод записи в консоль
  res.redirect('/service');
});

// изменяем статус активности категории
router.post('/deactivate_category', async (req, res) => {
  const category = await Category.findById(req.body.id);

  category.active = !!req.body.active; // !! двойное отрицание, переводит строку в булеан значение
  await category.save();

  res.redirect('/category');
});

// изменяем статус активности услуги
router.post('/deactivate_service', async (req, res) => {
  const service = await Service.findById(req.body.id);

  service.active = !!req.body.active; // !! двойное отрицание, переводит строку в булеан значение
  await service.save();

  res.redirect('/service');
});

// подключаем категорию
router.get('/category/:name', async (req, res) => {
  const categories = await Category.find({});
  res.render('categoryId', {
    title: 'Категория',
    isCategoryId: true,
    categories
  });
});

// подключаем услугу в категории
router.get('/category/:name/:id', (req, res) => {
  const obj = {
    title: 'Категория',
    id: 'ID',
    paragraphs: ['Рейтинг', 'Отзывы', 'Виды съемок', 'Фотографии', 'Стоимость']
  };
  res.render('categoryId', {
    title: 'Продавец',
    categoryName: req.params.name,
    categoryId: req.params.id,
    obj: obj
  });
});

module.exports = router;

/*
app.get('/', function (req, res) {
    res.render('index')
})
*/

/*
// переменная массив
let artists = [
    {
        id: 1,
        name: 'Metallica'
    },
    {
        id: 2,
        name: 'Iron Maden'
    },
    {
        id: 3,
        name: 'Deep Purple'
    }
]

// тестовые страницы
app.get('/artists', function (req, res) {
    res.send(artists)
})

app.get('/artists/:id', function (req, res) {
    console.log(req.params)
    let artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    })
    res.send(artist)
})

// добавление данных в БД
app.post('/artists', function (req, res) {
    let artist = {
        id: Date.now(),
        name: req.body.name
    }
    artists.push(artist)
    res.send(artist)
})

// изменение данных в БД
app.put('/artists/:id', function (req, res) {
    let artist = artists.find(function (artist) {
        return artist.id === Number(req.params.id)
    })
    artist.name = req.body.name
    res.sendStatus(200)
})

// удаление данных в БД
app.delete('/artists/:id', function (req, res) {
    artists = artists.filter(function (artist) {
        return artist.id !== Number(req.params.id)
    })
    res.sendStatus(200)
})

// пример вывода
const events = require('events') // подключение модуля событий
const util = require('util')

let Cars = function(model) {
    this.model = model
}

util.inherits(Cars, events.EventEmitter)

let bmw = new Cars('BMW')
let volvo = new Cars('Volvo')
let mazda = new Cars('Mazda')

let cars = [bmw, volvo, mazda]

cars.forEach(function (car) {
    car.on('speed', function (text) {
        console.log("Скорость автомобиля " + car.model + " составляет " + text)
    })
})

bmw.emit('speed', '50 км/ч')
*/
