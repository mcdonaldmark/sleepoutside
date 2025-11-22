import express from "express";
import fetch from "node-fetch"; // if using Node 18+, can use global fetch
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TARGET = "http://server-nodejs.cit.byui.edu:3000/"; // original BYUI API

// Search products by category
app.get("/products/search/:category", async (req, res) => {
  try {
    const response = await fetch(`${TARGET}products/search/${req.params.category}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID
app.get("/product/:id", async (req, res) => {
  try {
    const response = await fetch(`${TARGET}product/${req.params.id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Checkout endpoint
app.post("/checkout", async (req, res) => {
  try {
    const response = await fetch(`${TARGET}checkout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Proxy server running on port ${PORT}`));