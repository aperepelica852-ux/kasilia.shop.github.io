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
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("product-details-overlay");
  const closeBtn = document.getElementById("close-details");

  // Відкрити по кнопці "Детальніше"
  document.querySelectorAll(".details-button").forEach(btn => {
    btn.addEventListener("click", () => {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden"; // блокуємо скрол
    });
  });

  // Закрити по кнопці
  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Закрити по кліку на фон
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Закрити по Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
// --- дані товарів (залиште ваші) ---
const productDetails = {
  adel: { name: "Адель", price: "3800 грн", materials: "Фатин, шовк, мереживо", description: "Сукня з блискітками...", image: "dress-adel.jpg" },
  // ... інші
};

// --- допоміжна функція для відновлення скролу ---
function restoreBodyScrollIfNoOverlay() {
  if (!document.querySelector('.details-overlay')) {
    document.body.style.overflow = '';
  }
}

// --- показ детального модального вікна (створюємо елемент, додаємо локальні обробники) ---
function showDetails({ name, price, materials, description, image }) {
  // створюємо wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'details-overlay';
  wrapper.innerHTML = `
    <div class="details-content" role="dialog" aria-modal="true" style="max-width:420px; margin:40px auto; padding:20px; border-radius:12px; background:#fff;">
      <h2 style="font-size:20px; margin-bottom:10px;">${name}</h2>
      <img src="${image}" alt="${name}" style="width:100%; max-width:250px; border-radius:20px; margin-bottom:15px;">
      <p style="font-size:14px; line-height:1.4; margin-bottom:10px;"><strong>Ціна:</strong> ${price}</p>
      <p style="font-size:14px; line-height:1.4; margin-bottom:10px;"><strong>Матеріали:</strong> ${materials}</p>
      <p style="font-size:14px; line-height:1.4; margin-bottom:20px;"><strong>Опис:</strong> ${description}</p>
      <button class="close-button" aria-label="Close" style="padding:8px 12px; border-radius:8px;">Закрити</button>
    </div>
  `;

  // додати в DOM
  document.body.appendChild(wrapper);
  // блокувати скрол сторінки
  document.body.style.overflow = 'hidden';

  // закриття по кнопці
  const closeBtn = wrapper.querySelector('.close-button');
  closeBtn.addEventListener('click', () => {
    wrapper.remove();
    restoreBodyScrollIfNoOverlay();
    document.removeEventListener('keydown', onKeydown);
  });

  // закриття по кліку на фон (якщо клікнули саме на wrapper)
  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) {
      wrapper.remove();
      restoreBodyScrollIfNoOverlay();
      document.removeEventListener('keydown', onKeydown);
    }
  });

  // закриття по Escape (локальний обробник, видаляємо його після закриття)
  function onKeydown(e) {
    if (e.key === 'Escape') {
      if (wrapper.parentNode) wrapper.remove();
      restoreBodyScrollIfNoOverlay();
      document.removeEventListener('keydown', onKeydown);
    }
  }
  document.addEventListener('keydown', onKeydown);
}

// --- показ списку (favorites / cart) — схожа логіка, щоб не було дублювання ---
function showList(type) {
  const list = JSON.parse(localStorage.getItem(type)) || [];
  if (list.length === 0) {
    alert("Список порожній 😔");
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'details-overlay';
  wrapper.innerHTML = `
    <div class="details-content" role="dialog" aria-modal="true" style="max-width:520px; margin:40px auto; padding:20px; border-radius:12px; background:#fff;">
      <h2 style="margin-bottom:10px;">${type === 'favorites' ? 'Обране' : 'Кошик'}</h2>
      <div class="items-list">
        ${list.map(id => {
          const d = productDetails[id];
          if (!d) return '';
          return `
            <div style="display:flex; gap:12px; align-items:center; margin-bottom:12px;">
              <img src="${d.image}" alt="${d.name}" style="width:80px; height:auto; border-radius:10px;">
              <div>
                <strong>${d.name}</strong><br>
                <span>${d.price}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <button class="close-button" style="padding:8px 12px; border-radius:8px;">Закрити</button>
    </div>
  `;

  document.body.appendChild(wrapper);
  document.body.style.overflow = 'hidden';

  const closeBtn = wrapper.querySelector('.close-button');
  closeBtn.addEventListener('click', () => {
    wrapper.remove();
    restoreBodyScrollIfNoOverlay();
    document.removeEventListener('keydown', onKeydown);
  });
  wrapper.addEventListener('click', (e) => {
    if (e.target === wrapper) {
      wrapper.remove();
      restoreBodyScrollIfNoOverlay();
      document.removeEventListener('keydown', onKeydown);
    }
  });
  function onKeydown(e) {
    if (e.key === 'Escape') {
      if (wrapper.parentNode) wrapper.remove();
      restoreBodyScrollIfNoOverlay();
      document.removeEventListener('keydown', onKeydown);
    }
  }
  document.addEventListener('keydown', onKeydown);
}

// --- делегований обробник для кнопок "Детальніше", "Показати обране/кошик" ---
// Це гарантує, що нові елементи теж працюватимуть і тут нема дублювання слухачів.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.details-button');
  if (btn) {
    const card = btn.closest('.product-card');
    const id = card && card.dataset.id;
    const details = productDetails[id];
    if (details) showDetails(details);
    return;
  }

  // приклад: кнопки для favorites/cart, якщо у вас є елементи з класами .open-favorites / .open-cart
  if (e.target.closest('.open-favorites')) {
    showList('favorites');
    return;
  }
  if (e.target.closest('.open-cart')) {
    showList('cart');
    return;
  }
});

// --- якщо у вас у коді ще лишився старий блок, який працює з id="product-details-overlay" та id="close-details",
// просто перевірте існування елементів, щоб уникнути помилок:
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById("product-details-overlay");
  const closeBtn = document.getElementById("close-details");
  if (overlay && closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("active")) {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
});
