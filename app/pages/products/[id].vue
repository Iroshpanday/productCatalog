<script setup lang="ts">


import { useCartStore } from '~/stores/cart'; 

// 1. Get the current route parameters
const route = useRoute(); // Auto-imported
const productId = Number(route.params.id);

// 2. Fetch the single product data using useAsyncData

const { data: product, pending, error } = await useAsyncData(
  `product-${productId}`,
  // We use $fetch (auto-imported) to call our API
  () => $fetch(`/api/products/${productId}`), 
);

// 3. Handle 404 and Redirection
if (!product.value && !pending.value) {
    
    throw createError({ statusCode: 404, statusMessage: 'Product Not Found', fatal: true });
}

// 4. Set dynamic page metadata for SEO (Crucial for SSR)
useSeoMeta({ 
  title: product.value?.name ? `${product.value.name} | Nuxt Catalog` : 'Product Detail',
  description: product.value?.description,
});


// 5. 🛒 CART INTEGRATION
const cartStore = useCartStore();

function addToCart() {
  if (product.value) {
    cartStore.addProductToCart({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
    });
    
    // Simple confirmation alert
    alert(`${product.value.name} added to cart! Total items: ${cartStore.cartCount}`);
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <div v-if="pending" class="text-center text-xl">
      Loading Product Details...
    </div>
    <div v-else-if="error" class="text-center text-red-600 text-xl">
      Error fetching product: {{ error.statusMessage }}
      <div v-if="error.statusCode === 404">
        <p>The product you are looking for does not exist.</p>
        <NuxtLink to="/" class="text-blue-500 hover:underline mt-2 inline-block">Go back to the catalog</NuxtLink>
      </div>
    </div>

    <div v-else-if="product" class="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
      <div class="md:w-1/2">
        <NuxtImg
  :src="product.imageUrl" 
  :alt="product.name" 
  class="w-full h-96 object-cover"
  quality="80" 
  loading="eager" 
  width="600" 
  height="400" 
/>
      </div>

      <div class="p-8 md:w-1/2">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">
          {{ product.name }}
        </h1>
        <p class="text-2xl font-bold text-green-700 mb-6">${{ product.price.toFixed(2) }}</p>
        
        <p class="text-gray-500 mb-4 text-sm font-semibold uppercase">
          Category: {{ product.category }}
        </p>
        
        <p class="text-gray-700 leading-relaxed mb-8">
          {{ product.description }}
        </p>

        <button 
          @click="addToCart" 
          class="bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Add to Cart
        </button>

        <NuxtLink to="/" class="text-blue-500 hover:underline block mt-6">
            ← Back to Product List
        </NuxtLink>
      </div>
    </div>
  </div>
</template>