import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#"><h2 class="card__name">${item.Name}</h2></a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.list = [];
    this.total = 0;
    this.onChangeCallback = null;
  }

  async init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateTotal();
    this.renderCartContents();
    this.triggerChange();
  }

  calculateTotal() {
    this.total = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
  }

  renderCartContents() {
    const htmlItems = this.list.map(cartItemTemplate);
    const parent = document.querySelector(this.parentSelector);
    if (parent) parent.innerHTML = htmlItems.join("");
    const listTotalEl = document.querySelector(".list-total");
    if (listTotalEl) listTotalEl.innerText = `$${this.total}`;
  }

  // register a callback to be called whenever cart changes
  onChange(callback) {
    this.onChangeCallback = callback;
  }

  triggerChange() {
    this.onChangeCallback?.(this.total, this.list.length);
  }
}
