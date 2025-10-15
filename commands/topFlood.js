const { Markup } = require('telegraf');
const { getTopFloodCars } = require('../services/copartApi');

module.exports = async (ctx) => {
  try {
    const cars = await getTopFloodCars();
    if (!cars.length) return ctx.reply('🚫 Нет подходящих лотов');

    await ctx.reply(
      `🔎 Найдено ${cars.length} утопленников.\nОткрыть визуальные карточки?`,
      Markup.inlineKeyboard([
        Markup.button.webApp('📱 Открыть WebApp', 'https://localhost:3000')
      ])
    );
  } catch (err) {
    console.error(err);
    ctx.reply('❌ Ошибка при получении лотов');
  }
};