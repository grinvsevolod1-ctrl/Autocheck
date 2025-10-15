const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports.generateBrandNarrative = async () => {
  const prompt = `
Ты — креативный директор бренда AutoSniper. Сформулируй эмоционально насыщенное описание бренда, его миссии, визуального стиля и атмосферы. Упор на премиальность, скорость, технологичность, уверенность, визуальную чистоту и AI-интеллект.

Выведи:
1. 🔥 Миссия бренда (1-2 строки)
2. 🎯 Ценности и стиль (3 bullets)
3. 💬 Описание для лендинга (до 500 символов)
4. 🖼 Визуальная атмосфера (цвета, шрифт, анимации)
`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8
    });

    return res.choices[0].message.content;
  } catch (err) {
    console.error('❌ Ошибка генерации бренда:', err.message);
    return 'Ошибка генерации описания бренда';
  }
};