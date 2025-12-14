// app/composables/useProduct.ts

import { useProductStore } from '~/stores/product';

/**
 * Custom composable to access product data and related store actions.
 * This simplifies component logic and is a Nuxt best practice.
 */
export const useProduct = () => {
  const store = useProductStore();
  const { allProducts, isLoading, error, categories } = storeToRefs(store);

  // Return key state and methods
  return {
    products: allProducts,
    isLoading,
    error,
    categories,
    // Provide a simple function to get a product by ID from the store cache (useful after SSR)
    getProductById: (id: number) => store.getProductById(id),
  };
};