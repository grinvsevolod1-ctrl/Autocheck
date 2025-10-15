require('dotenv').config();
const { Telegraf } = require('telegraf');
const connectMongo = require('./db/mongo');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Подключение к MongoDB
connectMongo();

// Команды
const topFlood = require('./commands/topFlood');
const trackVin = require('./commands/trackVin');

bot.start((ctx) => ctx.reply('🚗 Добро пожаловать в AutoSniper!\n\nДоступные команды:\n/top_flood — топ утопленников\n/track VIN — отслеживать авто по VIN'));

bot.command('top_flood', topFlood);
bot.command('track', trackVin);

bot.launch();