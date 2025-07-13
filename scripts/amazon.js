import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select data-product-id="${product.id}" class="js-quantity-selector">
            ${[...Array(10)].map((_, i) => `
              <option value="${i + 1}" ${i === 0 ? 'selected' : ''}>${i + 1}</option>
            `).join('')}
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="../images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerText = cartQuantity;
  }

  setTimeout(() => {
    document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.dataset.productId;
          const selector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
          const quantity = Number(selector?.value || 1);

          addToCart(productId, quantity);
          updateCartQuantity();

          // ✅ Show "Added" message
          const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
          addedMessage.classList.add('added-to-cart-visible');

          setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
          }, 1500);
        });
      });
  }, 0);

  updateCartQuantity();
}
