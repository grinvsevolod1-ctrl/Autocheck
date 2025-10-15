require('dotenv').config();
const { Telegraf } = require('telegraf');
const connectMongo = require('./db/mongo');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Подключение к MongoDB
connectMongo();

// Команды
const profit = require('./commands/profit');
const topFlood = require('./commands/topFlood');
const trackVin = require('./commands/trackVin');
const subscribe = require('./commands/subscribe');
const unsubscribe = require('./commands/unsubscribe');
const mylist = require('./commands/mylist');
const compare = require('./commands/compare');
const brand = require('./commands/brand');
const vibe = require('./commands/vibe');


// Авторассылка
const { runNotifier } = require('./services/notifier');
setInterval(runNotifier, 10 * 60 * 1000); // каждые 10 минут

// Приветствие
bot.start((ctx) =>
  ctx.reply(`🚗 Добро пожаловать в AutoSniper!

📌 Команды:
/top_flood — топ утопленников
/track VIN — отслеживать авто по VIN
/subscribe [ключ] — подписка на новые лоты
/unsubscribe [ключ] — отмена подписки
/mylist — список ваших подписок`)
);

// Обработка команд
bot.command('top_flood', topFlood);
bot.command('track', trackVin);
bot.command('subscribe', subscribe);
bot.command('unsubscribe', unsubscribe);
bot.command('mylist', mylist);
bot.command('profit', profit);
bot.command('compare', compare);
bot.command('brand', brand);
bot.command('vibe', vibe);

// Запуск
bot.launch();