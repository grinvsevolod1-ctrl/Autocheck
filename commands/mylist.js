const { getSubscriptions } = require('../db/models');

module.exports = async (ctx) => {
  const subs = await getSubscriptions(ctx.chat.id);
  if (!subs.length) return ctx.reply('📭 У вас нет активных подписок');
  const list = subs.map((s) => `• ${s.keyword}`).join('\n');
  ctx.reply(`📌 Ваши подписки:\n${list}`);
};