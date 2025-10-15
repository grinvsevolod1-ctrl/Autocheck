require('dotenv').config();
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Команды
const topFlood = require('./commands/topFlood');
const trackVin = require('./commands/trackVin');

bot.start((ctx) => ctx.reply('🚗 Добро пожаловать в AutoSniper!'));
bot.command('top_flood', topFlood);
bot.command('track', trackVin);

bot.launch();