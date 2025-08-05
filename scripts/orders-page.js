import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct } from "../data/products.js";
import { loadProducts } from '../data/products.js';

loadProducts(() => {
  renderOrdersGrid();
});

function renderOrdersGrid() {
  let orderHTML = '';
  
  orders.forEach((order) => {
    let itemsHTML = '';
    order.products.forEach((orderItem) => {

      const matchingProduct = getProduct(orderItem.productId);
      if (!matchingProduct) {
        console.warn(`Product not found for productId: ${orderItem.productId}`);
      return; // skip this item
}
      const deliveryDate = dayjs(orderItem.estimatedDeliveryTime);
      const dateString = deliveryDate.format('MMMM D');

      itemsHTML += `
        <div class="product-image-container">
            <img src="${matchingProduct.image}">
        </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${dateString}
            </div>
            <div class="product-quantity">
              Quantity: ${orderItem.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${orderItem.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
      `;
    })

    const orderDate = dayjs(order.orderTime).format('MMMM D');
    const totalCost = `$${(order.totalCostCents / 100).toFixed(2)}`;
    const orderId = order.id
    orderHTML += `
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${totalCost}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderId}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${itemsHTML}
          </div>
        </div>
    `;
  })
  const ordersGrid = document.querySelector('.js-orders-grid');
  ordersGrid.innerHTML = orderHTML;

}



