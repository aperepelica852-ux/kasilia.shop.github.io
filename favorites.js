// Отримуємо всі кнопки сердечок
const favoriteButtons = document.querySelectorAll('.add-favorite');

// Завантажуємо збережені обрані товари з localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Функція оновлення вигляду сердечок
function updateFavoritesUI() {
  favoriteButtons.forEach(btn => {
    const productId = btn.dataset.id;
    if (favorites.includes(productId)) {
      btn.style.filter = 'invert(33%) sepia(96%) saturate(7490%) hue-rotate(329deg) brightness(102%) contrast(101%)'; // рожеве
    } else {
      btn.style.filter = 'none'; // стандартне
    }
  });
}

// Обробник натискання на сердечко (тільки додаємо/видаляємо, без сповіщень)
favoriteButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.id;

    if (favorites.includes(productId)) {
      favorites = favorites.filter(id => id !== productId); // видаляємо
    } else {
      favorites.push(productId); // додаємо
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesUI(); // оновлюємо UI
  });
});

// Ініціалізація при завантаженні сторінки
updateFavoritesUI();

// Оверлей обраного
const favoritesOverlay = document.getElementById('favorites-overlay');
const favoritesList = document.getElementById('favorites-list');
const closeFavorites = document.getElementById('close-favorites');
const favoritesHeaderIcon = document.querySelector('.header .icon-block img[alt="Обране"]');

// Показати обране тільки при натисканні на іконку у шапці
function showFavorites() {
  favoritesList.innerHTML = '';

  if(favorites.length === 0) {
    favoritesList.innerHTML = '<li>Ваше обране порожнє.</li>';
  } else {
    favorites.forEach(id => {
      const productCard = document.querySelector(`.product-card[data-id="${id}"]`);
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('p').textContent;
      favoritesList.innerHTML += `<li>${productName} — ${productPrice}</li>`;
    });
  }

  favoritesOverlay.style.display = 'flex'; // показ модалки
}

// Подія на іконку сердечка у хедері
favoritesHeaderIcon.addEventListener('click', showFavorites);

// Закриття оверлею
closeFavorites.addEventListener('click', () => {
  favoritesOverlay.style.display = 'none';
});
document.addEventListener('DOMContentLoaded', () => {
  const favorites = [];
  const favoritesList = document.getElementById('favorites-list');
  const favoritesOverlay = document.getElementById('favorites-overlay');
  const openFavoritesBtn = document.getElementById('open-favorites');
  const closeFavoritesBtn = document.getElementById('close-favorites');

  // Додавання в обране
  document.querySelectorAll('.add-favorite').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if(!favorites.includes(id)) {
        favorites.push(id);
        const li = document.createElement('li');
        li.textContent = id;
        favoritesList.appendChild(li);
      }
    });
  });

  // Відкриття/закриття оверлею
  openFavoritesBtn.addEventListener('click', () => {
    favoritesOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  closeFavoritesBtn.addEventListener('click', () => {
    favoritesOverlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  favoritesOverlay.addEventListener('click', e => {
    if(e.target === favoritesOverlay) {
      favoritesOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') {
      favoritesOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const favoritesList = document.getElementById('favorites-list');
  const favoritesOverlay = document.getElementById('favorites-overlay');
  const openFavoritesBtn = document.getElementById('open-favorites');
  const closeFavoritesBtn = document.getElementById('close-favorites');

  // Завантажуємо обране з localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  function renderFavorites() {
    favoritesList.innerHTML = '';
    favorites.forEach(id => {
      const li = document.createElement('li');
      li.textContent = id;
      favoritesList.appendChild(li);
    });
  }

  renderFavorites();

  // Додавання в обране
  document.querySelectorAll('.add-favorite').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (!favorites.includes(id)) {
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        renderFavorites();
      }
    });
  });

  // Відкриття/закриття оверлею
  openFavoritesBtn.addEventListener('click', () => {
    favoritesOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  closeFavoritesBtn.addEventListener('click', () => {
    favoritesOverlay.style.display = 'none';
    document.body.style.overflow = '';
  });

  favoritesOverlay.addEventListener('click', e => {
    if (e.target === favoritesOverlay) {
      favoritesOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      favoritesOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});
