<script setup lang="ts">
import { useProductStore } from '~/stores/product';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue'; // ref and computed are auto-imported by Nuxt

// --- 1. Store Setup and SSR Fetch ---

const store = useProductStore();
const { allProducts, isLoading, error } = storeToRefs(store);

// Use Nuxt's composable to handle SSR data fetching (ensures the store is populated before rendering)
const { pending } = await useAsyncData('products', () => store.fetchAllProducts(), {
    lazy: false,
});

// --- 2. Pagination State ---

const currentPage = ref(1); // The current page number
const itemsPerPage = 6;     // Number of products to show per page

// --- 3. Pagination Computed Properties ---

// Calculate the total number of pages required
const totalPages = computed(() => {
  if (!allProducts.value || allProducts.value.length === 0) return 1;
  return Math.ceil(allProducts.value.length / itemsPerPage);
});

// Get the slice of products for the current page
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allProducts.value.slice(start, end);
});

// --- 4. Pagination Actions ---

function setPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Scroll to the top of the product list when navigating pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// --- 5. SEO ---

useSeoMeta({
  title: `Product Catalog Page ${currentPage.value} | Nuxt SSR`,
  description: `Page ${currentPage.value} of the server-side rendered product catalog.`,
  ogTitle: 'Nuxt SSR Product Catalog',
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-green-600">
      Nuxt Product Catalog (SSR)
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
          <p class="text-2xl font-bold text-green-700 mt-3">${{ product.price.toFixed(2) }}</p>
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
/* Basic styling to make it readable */
.container {
  max-width: 1200px;
}
.text-center {
  text-align: center;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.p-4 {
  padding: 1rem;
}
/* ... (other simple styles from Tailwind classes) */
</style>