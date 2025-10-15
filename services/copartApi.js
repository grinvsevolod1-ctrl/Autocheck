const axios = require('axios');

// Заглушка: возвращает список утопленных авто
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

// Заглушка: возвращает авто по VIN
module.exports.getCarByVin = async (vin) => {
  return {
    year: 2020,
    make: 'Audi',
    model: 'Q5',
    damage: 'Flood',
    location: 'California',
    mileage: '38,000 mi',
    bid: 3100,
    profit: 4200,
    link: `https://www.copart.com/lot/${vin}`
  };
};