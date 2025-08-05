import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct } from "../data/products.js";
import { loadProducts } from '../data/products.js';
import { updateCartQuantityDisplay } from "../data/cart.js";

loadProducts(() => {
  updateCartQuantityDisplay();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = orders.find(o => o.id === orderId);
  if (!order) return console.error("Order not found");

  const orderItem = order.products.find(p => p.productId === productId);
  if (!orderItem) return console.error("Product not found in order");

  const product = getProduct(productId);
  if (!product) return console.error("Product details not found");

  const deliveryDate = dayjs(orderItem.estimatedDeliveryTime);

  // Progress logic
  const today = dayjs();
  let progress = 0;
  let currentStatusIndex = 0;
  if (today.isBefore(deliveryDate)) {
    progress = 50;
    currentStatusIndex = 1; // shipped
  } else {
    progress = 100;
    currentStatusIndex = 2; // delivered
  }

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">View all orders</a>
    <div class="delivery-date">Arriving on ${deliveryDate.format('dddd, MMMM D')}</div>
    <div class="product-info">${product.name}</div>
    <div class="product-info">Quantity: ${orderItem.quantity}</div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label">Preparing</div>
      <div class="progress-label">Shipped</div>
      <div class="progress-label">Delivered</div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progress}%;"></div>
    </div>
  `;

  const trackingContainer = document.querySelector(".js-order-tracking");
  trackingContainer.innerHTML = trackingHTML;

  // Highlight current status
  const labels = trackingContainer.querySelectorAll(".progress-label");
  labels[currentStatusIndex].classList.add("current-status");
});
