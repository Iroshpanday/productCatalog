<script setup lang="ts">
import { useProductStore } from '~/stores/product';
import { useCartStore } from '~/stores/cart';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';


// --- 1. Store Setup and SSR Fetch ---

const store = useProductStore();
const cartStore = useCartStore();
const { allProducts, isLoading, error } = storeToRefs(store);

const { pending } = await useAsyncData('products', () => store.fetchAllProducts(), {
    lazy: false,
});

// --- 2. Pagination State ---
const currentPage = ref(1);
const itemsPerPage = 6;

// --- 3. Pagination Computed Properties ---
const totalPages = computed(() => {
  if (!allProducts.value || allProducts.value.length === 0) return 1;
  return Math.ceil(allProducts.value.length / itemsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allProducts.value.slice(start, end);
});

// --- 4. Pagination Actions ---
function setPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// --- 5. Cart Action ---
function addToCart(product: { id: number, name: string, price: number }) {
  cartStore.addProductToCart(product);
  alert(`${product.name} added to cart! Total items: ${cartStore.cartCount}`);
}

// --- 6. SEO ---
useSeoMeta({
  title: `Product Catalog Page ${currentPage.value} | Nuxt SSR`,
  description: `Page ${currentPage.value} of the server-side rendered product catalog.`,
  ogTitle: 'Nuxt SSR Product Catalog',
});
</script>

<template>
  <div class="container mx-auto p-4">
    
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-700">
      Product List
    </h1>

    <div v-if="pending || isLoading" class="text-center text-xl p-10">
      Loading Products...
    </div>
    <div v-else-if="error" class="text-center text-red-600 text-xl p-10">
      Error: {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="border rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
      >
        <NuxtImg
          :src="product.imageUrl" 
          :alt="product.name" 
          class="w-full h-48 object-cover"
          quality="80" 
          loading="lazy" 
          width="400" 
          height="300" 
        />
        
        <div class="p-4">
          <NuxtLink :to="`/products/${product.id}`" class="text-xl font-semibold text-blue-600 hover:underline">
            {{ product.name }}
          </NuxtLink>
          
          <p class="text-gray-500 mt-1 text-sm">{{ product.category }}</p>
          
          <div class="flex justify-between items-center mt-3">
            <div>
              <span class="text-xl font-bold text-green-700">
                ${{ (product.price / 2).toFixed(2) }}
              </span>
              <span class="text-sm text-gray-400 line-through ml-2">${{ product.price.toFixed(2) }}</span>
            </div>
            
            <button 
              @click="addToCart(product)"
              class="bg-blue-600 text-white py-1 px-3 text-sm rounded-lg font-semibold hover:bg-blue-700 transition duration-300 whitespace-nowrap"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="totalPages > 1" class="flex justify-center mt-10 space-x-2">
      <button
        @click="setPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="[currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700']"
        class="text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
      >
        Previous
      </button>

      <button
        v-for="page in totalPages"
        :key="page"
        @click="setPage(page)"
        :class="[page === currentPage ? 'bg-blue-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-200 border']"
        class="py-2 px-4 rounded-lg font-semibold transition duration-200"
      >
        {{ page }}
      </button>

      <button
        @click="setPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="[currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700']"
        class="text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>