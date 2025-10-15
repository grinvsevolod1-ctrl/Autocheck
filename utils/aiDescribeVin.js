const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports.describeVin = async (car) => {
  const prompt = `
Ты — эксперт по визуальному брендингу и мотивации покупателей. Сформулируй эмоционально насыщенное описание автомобиля, которое вдохновит на покупку. Упор на визуальный стиль, атмосферу, уверенность, премиальность и потенциал восстановления.

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

Выведи:
1. 🔥 Визуальный потенциал: [высокий/средний/низкий]
2. 💬 Эмоциональное описание: [до 500 символов]
`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.85
    });

    const output = res.choices[0].message.content;
    const potential = output.match(/Визуальный потенциал: (.+)/)?.[1]?.trim();
    const description = output.match(/Эмоциональное описание: (.+)/)?.[1]?.trim();

    return { potential, description };
  } catch (err) {
    console.error('❌ Ошибка описания VIN:', err.message);
    return { potential: 'неизвестно', description: 'Нет данных' };
  }
};