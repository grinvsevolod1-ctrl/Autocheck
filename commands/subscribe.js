const { addSubscription } = require('../db/models');

module.exports = async (ctx) => {
  const keyword = ctx.message.text.split(' ').slice(1).join(' ');
  if (!keyword) return ctx.reply('❗ Укажите ключевое слово после команды');
  await addSubscription(ctx.chat.id, keyword);
  ctx.reply(`✅ Подписка на "${keyword}" добавлена`);
};