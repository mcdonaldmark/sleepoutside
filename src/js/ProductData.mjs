function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}

  async getData(category) {
    // Load JSON files directly from the public folder on Netlify.
    const response = await fetch(`/${category}.json`);
    return await convertToJson(response);
  }

  async findProductById(id) {
    // Product pages also need to pull from a single JSON source.
    // Load all product data and find the matching ID.
    const response = await fetch(`/all-products.json`);
    const products = await convertToJson(response);

    return products.find((item) => item.Id === id);
  }
}