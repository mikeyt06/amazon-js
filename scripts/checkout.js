import { renderOrderSummary } from "./checkout/orderSummary.js"; 
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch} from "../data/products.js";
import { loadCart, cart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

async function loadPage(){
  try{

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
    loadCart(() => {
      resolve('value3');
    });
  });

  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('.js-cart-quantity').innerText = `${cartQuantity} item${cartQuantity !== 1 ? 's' : ''}`;

  } catch(error) {
    console.log(error);
  }
  

  renderOrderSummary();
  renderPaymentSummary();

}
loadPage();
 
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1')
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
})


/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/