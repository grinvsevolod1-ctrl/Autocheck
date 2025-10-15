const cardsEl = document.getElementById('cards');

fetch('/api/cars')
  .then((res) => res.json())
  .then((cars) => {
    cars.forEach((car) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${car.year} ${car.make} ${car.model}</h2>
        <p>📍 ${car.location} | ${car.damage}</p>
        <p>📊 Пробег: ${car.mileage}</p>
        <p>💰 Ставка: $${car.bid} | Маржа: $${car.profit}</p>
        <p>🔥 Потенциал: ${car.potential}</p>
        <p>💬 ${car.description}</p>
        <a href="${car.link}" target="_blank">🔗 Перейти к лоту</a>
      `;
      cardsEl.appendChild(card);
    });
  });