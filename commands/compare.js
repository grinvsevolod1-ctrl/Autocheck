const { getCarByVin } = require('../services/copartApi');
const { formatCarCard } = require('../utils/formatCarCard');
const { evaluateCar } = require('../utils/aiFilter');

module.exports = async (ctx) => {
  const parts = ctx.message.text.split(' ');
  const vin1 = parts[1];
  const vin2 = parts[2];

  if (!vin1 || !vin2) return ctx.reply('❗ Укажите два VIN через пробел');

  try {
    const car1 = await getCarByVin(vin1);
    const car2 = await getCarByVin(vin2);

    if (!car1 || !car2) return ctx.reply('🚫 Один из VIN не найден');

    const ai1 = await evaluateCar(car1);
    const ai2 = await evaluateCar(car2);

    const msg1 = `🔎 VIN ${vin1}\n` + formatCarCard(car1) + `\n🔥 Потенциал: ${ai1.potential}\n💬 ${ai1.description}`;
    const msg2 = `🔎 VIN ${vin2}\n` + formatCarCard(car2) + `\n🔥 Потенциал: ${ai2.potential}\n💬 ${ai2.description}`;

    ctx.reply(msg1);
    ctx.reply(msg2);

    const summary = `
📊 Сравнение:
• ${car1.make} ${car1.model} (${vin1}) — маржа $${car1.profit}, потенциал: ${ai1.potential}
• ${car2.make} ${car2.model} (${vin2}) — маржа $${car2.profit}, потенциал: ${ai2.potential}

💡 Вывод: ${car1.profit > car2.profit ? vin1 : vin2} выглядит выгоднее по марже.
`;
    ctx.reply(summary);
  } catch (err) {
    console.error(err);
    ctx.reply('❌ Ошибка при сравнении VIN');
  }
};