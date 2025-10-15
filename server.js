const express = require('express');
const app = express();
const { getTopFloodCars } = require('./services/copartApi');
const { describeVin } = require('./utils/aiDescribeVin');

// Отдаём WebApp-фронт
app.use(express.static('webapp'));

// API-маршрут для карточек
app.get('/api/cars', async (req, res) => {
  const cars = await getTopFloodCars();
  const enriched = await Promise.all(
    cars.map(async (car) => {
      const ai = await describeVin(car);
      return { ...car, ...ai };
    })
  );
  res.json(enriched);
});

// Запуск сервера
app.listen(3000, () => console.log('🚀 WebApp запущен на http://localhost:3000'));