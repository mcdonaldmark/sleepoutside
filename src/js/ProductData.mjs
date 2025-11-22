const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  async getData(category) {
    try {
      const response = await fetch(`../json/${category}.json`);
      const data = await response.json();
      return data.Result || [];
    } catch (err) {
      console.error(`Failed to load ../json/${category}.json`, err);
      return [];
    }
  }

  async findProductById(id) {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const category = urlParams.get("category");

    try {
      const response = await fetch(`../json/${category}.json`);
      const data = await response.json();
      const products = data.Result || [];
      return products.find((p) => p.Id === id) || null;
    } catch (err) {
      console.error(`Failed to load ../json/${category}.json`, err);
      return null;
    }
  }
}
