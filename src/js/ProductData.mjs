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
      const response = await fetch(`/json/${category}.json`);
      const data = await response.json();
      return data.Result || [];  // <-- return only the array of products
    } catch (err) {
      console.error(`Failed to load /json/${category}.json`, err);
      return [];
    }
  }
  
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }

  async findProductById(category, id) {
    try {
      const response = await fetch(`/json/${category}.json`);
      const data = await response.json();
      const products = data.Result || [];
      return products.find(p => p.Id === id) || null;
    } catch (err) {
      console.error(`Failed to load /json/${category}.json`, err);
      return null;
    }
  }
}