const { getTopFloodCars } = require('../services/copartApi');
const { formatCarCard } = require('../utils/formatCarCard');

module.exports = async (ctx) => {
  try {
    const cars = await getTopFloodCars();
    if (!cars.length) return ctx.reply('🚫 Нет подходящих лотов');
    for (const car of cars) {
      const message = formatCarCard(car);
      await ctx.reply(message);
    }
  } catch (err) {
    console.error(err);
    ctx.reply('❌ Ошибка при получении лотов');
  }
};