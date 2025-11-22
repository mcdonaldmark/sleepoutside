import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  base: "/sleepoutside/",   // important: matches your repo name
  build: {
    outDir: "../docs",      // deploy built files to docs/
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
