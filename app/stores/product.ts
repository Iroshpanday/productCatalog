// app/stores/product.ts

import { defineStore } from 'pinia';

// Define a type for your product for better type safety (Highly recommended)
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: any | null;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    isLoading: false,
    error: null,
  }),

  actions: {
    // 💡 Key concept: useFetch is SSR-compatible!
    // We use $fetch for calling our server API routes.
    async fetchAllProducts() {
      if (this.products.length > 0) return; // Basic caching

      this.isLoading = true;
      this.error = null;

      try {
        // Use $fetch (Nuxt's universal fetch utility) to call our internal API
        const response = await $fetch('/api/products');
        this.products = response.products as Product[];
      } catch (error) {
        this.error = 'Failed to fetch products.';
        console.error('API Fetch Error:', error);
      } finally {
        this.isLoading = false;
      }
    },

    // A getter is often better, but for a complex search/filter you might use an action
    getProductById(id: number): Product | undefined {
        return this.products.find(p => p.id === id);
    }
  },

  getters: {
    // Use this to get product data in your components
    allProducts: (state) => state.products,
    // A simple filter to demonstrate getter usage
    categories: (state) => [...new Set(state.products.map(p => p.category))],
  },
});