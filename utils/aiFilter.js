const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 📊 AI-оценка визуального потенциала
module.exports.evaluateCar = async (car) => {
  const prompt = `
Ты — эксперт по восстановлению автомобилей с аукционов США. Оцени визуальный потенциал и эмоциональную привлекательность следующего лота. Дай краткий вывод: стоит ли его отслеживать, насколько он интересен, и как его можно описать для Telegram-карточки.

Информация:
Марка: ${car.make}
Модель: ${car.model}
Год: ${car.year}
Повреждение: ${car.damage}
Пробег: ${car.mileage}
Локация: ${car.location}
Ставка: $${car.bid}
Маржа: $${car.profit}
Ссылка: ${car.link}

Ответ должен быть в формате:
- 🔥 Потенциал: [высокий/средний/низкий]
- 💬 Описание: [эмоциональный текст для Telegram]
`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const output = res.choices[0].message.content;
    const potential = output.match(/Потенциал: (.+)/)?.[1]?.trim();
    const description = output.match(/Описание: (.+)/)?.[1]?.trim();

    return { potential, description };
  } catch (err) {
    console.error('❌ AI-фильтрация ошибка:', err.message);
    return { potential: 'неизвестно', description: 'Нет данных' };
  }
};