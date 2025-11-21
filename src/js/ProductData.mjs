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
      const response = await fetch(`/json/${category}.json`);
      const data = await convertToJson(response);
      return data; // keep the same return format as your original backend
    } catch (err) {
      console.error(`Failed to load /json/${category}.json`, err);
      return [];
    }
  }

  // Find a product by ID from the "all-products.json" file
  async findProductById(id) {
    try {
      const response = await fetch(`/json/all-products.json`);
      const products = await convertToJson(response);
      const product = products.find((item) => item.Id === id);
      if (!product) {
        console.warn(`Product with ID ${id} not found`);
      }
      return product;
    } catch (err) {
      console.error("Failed to load /json/all-products.json", err);
      return null;
    }
  }
}