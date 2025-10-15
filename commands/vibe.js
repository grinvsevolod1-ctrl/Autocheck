const { getCarByVin } = require('../services/copartApi');
const { describeVin } = require('../utils/aiDescribeVin');
const { formatCarCard } = require('../utils/formatCarCard');

module.exports = async (ctx) => {
  const vin = ctx.message.text.split(' ')[1];
  if (!vin || vin.length < 5) return ctx.reply('❗ Укажите VIN после команды');

  try {
    const car = await getCarByVin(vin);
    if (!car) return ctx.reply('🚫 Машина с таким VIN не найдена');

    const ai = await describeVin(car);
    const message = formatCarCard(car) + `\n🔥 Визуальный потенциал: ${ai.potential}\n💬 ${ai.description}`;
    ctx.reply(message);
  } catch (err) {
    console.error(err);
    ctx.reply('❌ Ошибка при описании VIN');
  }
};