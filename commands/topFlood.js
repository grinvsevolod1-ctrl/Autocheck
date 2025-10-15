const { getTopFloodCars } = require('../services/copartApi');
const { formatCarCard } = require('../utils/formatCarCard');
const { evaluateCar } = require('../utils/aiFilter');

module.exports = async (ctx) => {
  try {
    const cars = await getTopFloodCars();
    if (!cars.length) return ctx.reply('🚫 Нет подходящих лотов');

    for (const car of cars) {
      const ai = await evaluateCar(car);
      const message = formatCarCard(car) + `\n🔥 Потенциал: ${ai.potential}\n💬 ${ai.description}`;
      await ctx.reply(message);
    }
  } catch (err) {
    console.error(err);
    ctx.reply('❌ Ошибка при получении лотов');
  }
};