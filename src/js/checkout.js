import { loadHeaderFooter, qs } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// wait for header/footer to load
loadHeaderFooter().then(() => {
  // initialize cart counter
  const cart = new ShoppingCart("so-cart", ".product-list");

  function updateCartCounter(total, itemsCount) {
    const countEl = qs(".cart-count");
    if (!countEl) return;
    countEl.textContent = itemsCount || 0;
  }

  cart.onChange(updateCartCounter);
  cart.init();

  // initialize checkout process
  const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
  myCheckout.init();

  // zip blur listener
  document
    .querySelector("#zip")
    .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));

  // checkout button listener
  document
    .querySelector("#checkoutSubmit")
    .addEventListener("click", (e) => {
      e.preventDefault();
      myCheckout.checkout();
    });
});
