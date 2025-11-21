function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Failed to fetch JSON");
  }
}

export default class ProductData {
  constructor() {
    // Nothing needed in constructor
  }

  // Get all products for a specific category
  async getData(category) {
    try {
      const response = await fetch(`/json/${category.toLowerCase()}.json`);
      const data = await response.json();
      return data; // returns array of products
    } catch (err) {
      console.error(`Failed to load /json/${category}.json`, err);
      return [];
    }
  }

  // Find a product by ID within a specific category file
  async findProductById(category, id) {
    try {
      const response = await fetch(`/json/${category.toLowerCase()}.json`);
      const products = await response.json();
      return products.find((item) => item.Id === id) || null;
    } catch (err) {
      console.error(`Failed to load /json/${category}.json`, err);
      return null;
    }
  }
}