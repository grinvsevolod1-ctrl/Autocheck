require('dotenv').config();
const { Telegraf } = require('telegraf');
const connectMongo = require('./db/mongo');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Подключение к MongoDB
connectMongo();

// Команды
const topFlood = require('./commands/topFlood');
const trackVin = require('./commands/trackVin');
const subscribe = require('./commands/subscribe');
const unsubscribe = require('./commands/unsubscribe');
const mylist = require('./commands/mylist');

// Приветствие
bot.start((ctx) =>
  ctx.reply(`🚗 Добро пожаловать в AutoSniper!

Доступные команды:
/top_flood — топ утопленников
/track VIN — отслеживать авто по VIN
/subscribe [ключ] — подписка на новые лоты
/unsubscribe [ключ] — отмена подписки
/mylist — список ваших подписок`)
);

// Команды
bot.command('top_flood', topFlood);
bot.command('track', trackVin);
bot.command('subscribe', subscribe);
bot.command('unsubscribe', unsubscribe);
bot.command('mylist', mylist);

// Запуск
bot.launch();