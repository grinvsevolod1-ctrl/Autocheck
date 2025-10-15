const { addTrackedVin } = require('../db/models');
const { getCarByVin } = require('../services/copartApi');
const { formatCarCard } = require('../utils/formatCarCard');

module.exports = async (ctx) => {
  const parts = ctx.message.text.split(' ');
  const vin = parts[1];
  if (!vin || vin.length < 5) return ctx.reply('❗ Укажите корректный VIN после команды');

  try {
    const car = await getCarByVin(vin);
    if (!car) return ctx.reply('🚫 Машина с таким VIN не найдена');

    await addTrackedVin(vin);
    const message = formatCarCard(car);
    ctx.reply(`✅ VIN ${vin} добавлен в отслеживание`);
    ctx.reply(message);
  } catch (err) {
    console.error(err);
    ctx.reply('❌ Ошибка при отслеживании VIN');
  }
};