export default class ProductData {
  async getData(category) {
    try {
      const response = await fetch(`../json/${category}.json`);
      const data = await response.json();
      return Array.isArray(data) ? data : data.Result || [];
    } catch (err) {
      console.error(`Failed to load ../json/${category}.json`, err);
      return [];
    }
  }

  async findProductById(category, id) {
    if (!category || !id) {
      console.error("Missing category or product ID", category, id);
      return null;
    }

    try {
      const response = await fetch(`../json/${category}.json`);
      const data = await response.json();
      const products = Array.isArray(data) ? data : data.Result || [];
      return products.find((p) => String(p.Id) === String(id)) || null;
    } catch (err) {
      console.error(`Failed to load ../json/${category}.json`, err);
      return null;
    }
  }
}
