const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const { getTopFloodCars } = require('./copartApi');
const { formatCarCard } = require('../utils/formatCarCard');
const { getAllSubscriptions } = require('../db/models');

let sentCache = new Set(); // Чтобы не слать повторно

const runNotifier = async () => {
  try {
    const subs = await getAllSubscriptions();
    const cars = await getTopFloodCars(); // Можно заменить на getAllCars()

    for (const sub of subs) {
      const keyword = sub.keyword.toLowerCase();
      const matched = cars.filter((car) =>
        `${car.make} ${car.model}`.toLowerCase().includes(keyword)
      );

      for (const car of matched) {
        const key = `${sub.chatId}-${car.link}`;
        if (sentCache.has(key)) continue;

        const message = formatCarCard(car);
        await bot.telegram.sendMessage(sub.chatId, `🔔 Новый лот по подписке "${sub.keyword}":\n${message}`);
        sentCache.add(key);
      }
    }
  } catch (err) {
    console.error('❌ Ошибка в авторассылке:', err);
  }
};

module.exports = { runNotifier };