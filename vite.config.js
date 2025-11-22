import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  base: "/sleepoutside/", // GitHub Pages base
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        checkout_success: resolve(__dirname, "src/checkout/success.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
        product_page: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});
