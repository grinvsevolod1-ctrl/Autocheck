const { searchByKeyword } = require('../services/copartApi');
const { formatCarCard } = require('../utils/formatCarCard');
const { evaluateCar } = require('../utils/aiFilter');

module.exports = async (ctx) => {
  const keyword = ctx.message.text.split(' ').slice(1).join(' ');
  if (!keyword) return ctx.reply('❗ Укажите марку и модель после команды');

  try {
    const cars = await searchByKeyword(keyword);
    if (!cars.length) return ctx.reply('🚫 Ничего не найдено по запросу');

    for (const car of cars.slice(0, 3)) {
      const ai = await evaluateCar(car);
      const message = formatCarCard(car) + `\n🔥 Потенциал: ${ai.potential}\n💬 ${ai.description}`;
      await ctx.reply(message);
    }
  } catch (err) {
    console.error(err);
    ctx.reply('❌ Ошибка при расчёте маржи');
  }
};