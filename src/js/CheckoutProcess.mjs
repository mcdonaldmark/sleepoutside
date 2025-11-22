import {
  setLocalStorage,
  getLocalStorage,
  alertMessage,
  removeAllAlerts,
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = (items || []).map((item) => {
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }
  calculateItemSummary() {
    const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
    const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
    itemNumElement.innerText = (this.list && this.list.length) || 0;
    // calculate the total of all the items in the cart
    const amounts = (this.list || []).map((item) => Number(item.FinalPrice || 0));
    this.itemTotal = amounts.length ? amounts.reduce((sum, item) => sum + item, 0) : 0;
    summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
  }
  calculateOrdertotal() {
    this.shipping = 0;
    if (this.list && this.list.length > 0) {
      this.shipping = 10 + (this.list.length - 1) * 2;
    }
    this.tax = Number((this.itemTotal * 0.06).toFixed(2));
    this.orderTotal = (
      Number(this.itemTotal) +
      Number(this.shipping) +
      Number(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(this.outputSelector + " #orderTotal");
    if (shipping) shipping.innerText = "$" + Number(this.shipping).toFixed(2);
    if (tax) tax.innerText = "$" + Number(this.tax).toFixed(2);
    if (orderTotal) orderTotal.innerText = "$" + Number(this.orderTotal).toFixed(2);
  }
  async checkout() {
    const formElement = document.forms["checkout"];
    if (!formElement) {
      alertMessage("Checkout form not found.");
      return;
    }

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    try {
      const res = await services.checkout(json);
      setLocalStorage("so-cart", []);
      // notify other parts of the app
      window.dispatchEvent(new CustomEvent("cart-updated"));
      location.assign("/checkout/success.html");
    } catch (err) {
      removeAllAlerts();
      if (err && err.message) {
        if (typeof err.message === "string") {
          alertMessage(err.message);
        } else {
          for (let message in err.message) {
            alertMessage(err.message[message]);
          }
        }
      }
      console.log(err);
    }
  }
}
