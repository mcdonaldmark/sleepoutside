import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const imgSrc = item?.Images?.PrimaryMedium || "";
  const name = item?.Name || item?.NameWithoutBrand || "Product";
  const color = item?.Colors?.[0]?.ColorName || "";
  const price = Number(item?.FinalPrice || 0).toFixed(2);

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${imgSrc}" alt="${name}" />
    </a>
    <a href="#"><h2 class="card__name">${name}</h2></a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${price}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.list = [];
    this.total = 0;
    this.onChangeCallback = null;

    // bind for event listener cleanup if needed
    this._onExternalCartUpdated = this._onExternalCartUpdated.bind(this);
  }

  async init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateTotal();
    this.renderCartContents();
    this.triggerChange();

    // listen for global cart-updated events (e.g., from other pages/components)
    window.addEventListener("cart-updated", this._onExternalCartUpdated);
  }

  // cleanup if ever needed
  destroy() {
    window.removeEventListener("cart-updated", this._onExternalCartUpdated);
  }

  _onExternalCartUpdated() {
    // reload from storage and re-render
    this.list = getLocalStorage(this.key) || [];
    this.calculateTotal();
    this.renderCartContents();
    this.triggerChange();
  }

  calculateTotal() {
    this.total = (this.list || []).reduce((sum, item) => {
      const price = Number(item?.FinalPrice || 0);
      return sum + price;
    }, 0);
  }

  renderCartContents() {
    const htmlItems = (this.list || []).map(cartItemTemplate);
    const parent = document.querySelector(this.parentSelector);
    if (parent) parent.innerHTML = htmlItems.join("");
    const listTotalEl = document.querySelector(".list-total");
    if (listTotalEl) listTotalEl.innerText = `$${this.total.toFixed(2)}`;
  }

  onChange(callback) {
    this.onChangeCallback = callback;
  }

  triggerChange() {
    if (typeof this.onChangeCallback === "function") {
      try {
        this.onChangeCallback(this.total, (this.list || []).length);
      } catch (err) {
        console.error("onChange callback error:", err);
      }
    }
  }
}
