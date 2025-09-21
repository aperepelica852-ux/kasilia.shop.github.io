const productDetails = {
  adel: {
    name: "Адель",
    price: "3800 грн",
    materials: "Фатин, шовк, мереживо",
    description: "Сукня з блискітками, пишними рукавами та ніжною підкладкою. Ідеальна для святкових подій.",
    image: "dress-adel.jpg"
  },
  kamila: {
    name: "Каміла",
    price: "2500 грн",
    materials: "Бавовна, еластан",
    description: "Класична чорна сукня з елегантним силуетом. Підходить для вечірніх заходів.",
    image: "dress-kamila.jpg"
  },
  emili: {
    name: "Емілі",
    price: "3100 грн",
    materials: "Шифон, органза",
    description: "Ніжна пастельна сукня з повітряними рукавами. Ідеальна для фотосесій та свят.",
    image: "dress-emili.jpg"
  },
  keri: {
    name: "Кері",
    price: "2700 грн",
    materials: "Льон, бавовна",
    description: "Легка літня сукня з квітковим принтом. Комфортна для щоденного носіння.",
    image: "dress-keri.jpg"
  },
  suzi: {
    name: "Сузі",
    price: "2900 грн",
    materials: "Атлас, фатин",
    description: "Сукня з бантом на спині та пишною спідницею. Ідеальна для урочистих подій.",
    image: "dress-suzi.jpg"
  },
  eliza: {
    name: "Еліза",
    price: "3500 грн",
    materials: "Оксамит, мереживо",
    description: "Розкішна сукня з вишивкою та глибоким кольором. Для особливих моментів.",
    image: "dress-eliza.jpg"
  }
};

// Відкриття модального вікна при натисканні на кнопку "Детальніше"
document.querySelectorAll('.details-button').forEach(button => {
  button.addEventListener('click', event => {
    const card = event.target.closest('.product-card');
    const id = card.dataset.id;
    const details = productDetails[id];
    if (details) {
      showDetails(details);
    }
  });
});

// Спільна функція для показу товару (деталі, обране, кошик)
function showDetails({ name, price, materials, description, image }) {
  const html = `
    <div class="details-overlay">
      <div class="details-content">
        <h2 style="font-size: 20px; margin-bottom: 10px;">${name}</h2>
        <img src="${image}" alt="${name}" style="width:100%; max-width:250px; border-radius:20px; margin-bottom: 15px;">
        <p style="font-size: 14px; line-height: 1.4; margin-bottom: 10px;"><strong>Ціна:</strong> ${price}</p>
        <p style="font-size: 14px; line-height: 1.4; margin-bottom: 10px;"><strong>Матеріали:</strong> ${materials}</p>
        <p style="font-size: 14px; line-height: 1.4; margin-bottom: 20px;"><strong>Опис:</strong> ${description}</p>
        <button class="close-button">Закрити</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
  document.querySelector('.close-button').addEventListener('click', () => {
    document.querySelector('.details-overlay').remove();
  });
}

// Показ списку товарів з localStorage (для favorites.js і cart.js)
function showList(type) {
  const list = JSON.parse(localStorage.getItem(type)) || [];
  if (list.length === 0) {
    alert("Список порожній 😔");
    return;
  }

  const html = `
    <div class="details-overlay">
      <div class="details-content">
        <h2>${type === 'favorites' ? 'Обране' : 'Кошик'}</h2>
        ${list.map(id => {
          const details = productDetails[id];
          if (!details) return '';
          return `
            <div style="margin-bottom:20px;">
              <img src="${details.image}" alt="${details.name}" style="width:100px; border-radius:10px;"><br>
              <strong>${details.name}</strong><br>
              <span>${details.price}</span>
            </div>
          `;
        }).join('')}
        <button class="close-button">Закрити</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
  document.querySelector('.close-button').addEventListener('click', () => {
    document.querySelector('.details-overlay').remove();
  });
}
