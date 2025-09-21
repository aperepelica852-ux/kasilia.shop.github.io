// Кошик
const cartIcons = document.querySelectorAll('.add-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartList = document.getElementById('cart-list');
const closeCart = document.getElementById('close-cart');
const checkoutButton = document.querySelector('.checkout-button');
const cartHeaderIcon = document.querySelector('.header .icon-block img[alt="Кошик"]');

// Завантаження з localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функція оновлення корзини
function updateCartUI() {
  cartList.innerHTML = '';

  if(cart.length === 0) {
    cartList.innerHTML = '<li>Ваш кошик порожній.</li>';
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.marginBottom = '10px';
      
      li.innerHTML = `
        <img src="${item.img}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; margin-right:10px;">
        <span style="flex:1">${item.name} — ${item.price}</span>
        <button class="remove-cart-item" data-id="${item.id}">✕</button>
      `;
      cartList.appendChild(li);
    });

    // Кнопки видалення
    const removeButtons = document.querySelectorAll('.remove-cart-item');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        cart = cart.filter(i => i.id !== btn.dataset.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
      });
    });
  }
}

// Додавання у кошик
cartIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const productCard = icon.closest('.product-card');
    const productId = productCard.dataset.id;
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('p').textContent;
    const productImg = productCard.querySelector('img').src;

    if (!cart.some(i => i.id === productId)) {
      cart.push({id: productId, name: productName, price: productPrice, img: productImg});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    cartOverlay.style.display = 'flex';
  });
});

// Подія на іконку кошика у хедері
cartHeaderIcon.addEventListener('click', () => {
  updateCartUI();
  cartOverlay.style.display = 'flex';
});

// Закриття оверлею
closeCart.addEventListener('click', () => {
  cartOverlay.style.display = 'none';
});

// Оформлення замовлення
checkoutButton.addEventListener('click', () => {
  alert('Перехід до оформлення замовлення!');
});
