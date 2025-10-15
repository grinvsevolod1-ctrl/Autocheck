const axios = require('axios');

// Заглушка: возвращает фейковые данные
module.exports.getTopFloodCars = async () => {
  return [
    {
      year: 2019,
      make: 'BMW',
      model: 'X5',
      damage: 'Flood',
      location: 'Texas',
      mileage: '42,000 mi',
      bid: 3200,
      profit: 4500,
      link: 'https://www.copart.com/lot/12345678'
    },
    {
      year: 2020,
      make: 'Lexus',
      model: 'RX350',
      damage: 'Flood',
      location: 'Florida',
      mileage: '35,000 mi',
      bid: 2900,
      profit: 4000,
      link: 'https://www.copart.com/lot/87654321'
    }
  ];
};