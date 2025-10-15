const { generateBrandNarrative } = require('../utils/brandNarrative');

module.exports = async (ctx) => {
  try {
    const text = await generateBrandNarrative();
    ctx.reply(text);
  } catch (err) {
    console.error('❌ Ошибка генерации бренда:', err.message);
    ctx.reply('🚫 Не удалось сгенерировать описание бренда');
  }
};