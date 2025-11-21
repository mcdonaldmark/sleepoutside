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

async getData(category) {
  try {
    const response = await fetch(`/json/${category.toLowerCase()}.json`);
    const data = await convertToJson(response);
    return data;
  } catch (err) {
    console.error(`Failed to load /json/${category}.json`, err);
    return [];
  }
}

async findProductById(id) {
  try {
    const response = await fetch(`/json/all-products.json`);
    const products = await convertToJson(response);
    return products.find((item) => item.Id === id) || null;
  } catch (err) {
    console.error("Failed to load /json/all-products.json", err);
    return null;
  }
}

}