import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter().then(() => {
  const cart = new ShoppingCart("so-cart", ".product-list");

  function updateCartCounter(total, itemsCount) {
    const countEl = qs(".cart-count");
    if (!countEl) return;
    countEl.textContent = itemsCount || 0;
  }

  cart.onChange(updateCartCounter);
  cart.init();

  const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
  myCheckout.init();

  const zipEl = document.querySelector("#zip");
  if (zipEl) {
    zipEl.addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));
  }

  const checkoutBtn = document.querySelector("#checkoutSubmit");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      myCheckout.checkout();
    });
  }
});
