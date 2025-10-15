const axios = require('axios');

// 🔐 API-ключ из .env
const API_KEY = process.env.COPART_API_KEY;
const BASE_URL = 'https://copart-iaai-api.com/api';

// 💰 Примерная рыночная цена (заглушка)
const getMarketPrice = (car) => {
  const base = 10000;
  const agePenalty = (2025 - car.year) * 800;
  return base + (car.make === 'BMW' ? 3000 : 0) - agePenalty;
};

// 📊 Расчёт маржи
const estimateProfit = (car) => {
  const market = getMarketPrice(car);
  const totalCost = car.currentBid + 1500; // доставка + ремонт
  return Math.max(0, market - totalCost);
};

// 🔍 Поиск по VIN
module.exports.getCarByVin = async (vin) => {
  try {
    const res = await axios.get(`${BASE_URL}/vin/${vin}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });
    const data = res.data;

    return {
      year: data.year,
      make: data.make,
      model: data.model,
      damage: data.damage,
      location: data.location,
      mileage: data.odometer,
      bid: data.currentBid,
      profit: estimateProfit(data),
      link: `https://www.copart.com/lot/${data.lotNumber}`
    };
  } catch (err) {
    console.error('❌ VIN-поиск ошибка:', err.message);
    return null;
  }
};

// 🔍 Поиск по ключевым словам
module.exports.searchByKeyword = async (keyword) => {
  try {
    const res = await axios.get(`${BASE_URL}/search?query=${encodeURIComponent(keyword)}`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    return res.data.results.map((lot) => ({
      year: lot.year,
      make: lot.make,
      model: lot.model,
      damage: lot.damage,
      location: lot.location,
      mileage: lot.odometer,
      bid: lot.currentBid,
      profit: estimateProfit(lot),
      link: `https://www.copart.com/lot/${lot.lotNumber}`
    }));
  } catch (err) {
    console.error('❌ Поиск по ключу ошибка:', err.message);
    return [];
  }
};

// 🔍 Топ утопленников
module.exports.getTopFloodCars = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/search?damage=Flood&sort=profit_desc`, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    return res.data.results.map((lot) => ({
      year: lot.year,
      make: lot.make,
      model: lot.model,
      damage: lot.damage,
      location: lot.location,
      mileage: lot.odometer,
      bid: lot.currentBid,
      profit: estimateProfit(lot),
      link: `https://www.copart.com/lot/${lot.lotNumber}`
    }));
  } catch (err) {
    console.error('❌ Flood-поиск ошибка:', err.message);
    return [];
  }
};