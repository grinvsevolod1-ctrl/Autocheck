module.exports.formatCarCard = (car) => {
  return `
🚗 ${car.year} ${car.make} ${car.model}
💥 Повреждение: ${car.damage}
📍 Локация: ${car.location}
📈 Пробег: ${car.mileage}
💰 Ставка: $${car.bid}
📊 Маржа: +$${car.profit}
🔗 Ссылка: ${car.link}
`;
};