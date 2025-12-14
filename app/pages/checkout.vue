<script setup lang="ts">

definePageMeta({
  auth: true, 
  middleware: ['auth'] 
});

// 2. Import the useAuth composable from the correct, renamed file
import { useAuth } from '~/middleware/auth'; 
import { useCartStore } from '~/stores/cart';
import { storeToRefs } from 'pinia';

const { isLoggedIn, logout } = useAuth();
const cartStore = useCartStore();
const { cartCount, cartTotal, items } = storeToRefs(cartStore);

useSeoMeta({
  title: 'Secure Checkout | Nuxt',
  description: 'The final, secured step of the purchase process.',
});

</script>

<template>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6 text-blue-600">
      🔒 Secure Checkout
    </h1>
    
    <div v-if="isLoggedIn" class="p-6 border rounded-lg shadow-lg bg-green-50">
      <p class="text-xl text-green-700 mb-4">You are securely logged in. Proceeding with order...</p>
      
      <div v-if="cartCount > 0">
          <p class="text-lg">Total items: <span class="font-bold">{{ cartCount }}</span></p>
          <p class="text-lg mb-4">Total amount: <span class="font-bold">${{ cartTotal.toFixed(2) }}</span></p>

          <div class="space-y-2">
            <div v-for="item in items" :key="item.id" class="flex justify-between border-b py-1">
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
      </div>
      <div v-else>
          <p class="text-lg text-yellow-700">Your cart is currently empty. Add some products before checking out!</p>
      </div>

      <button 
        @click="logout" 
        class="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Logout and Go Home
      </button>
    </div>
    <div v-else>
        <p v-if="$route.meta.isRedirecting" class="text-xl text-red-700 p-6 border border-red-300 bg-red-50 rounded-lg">
            Access Denied. Redirecting in 1 seconds...
        </p>
        <p v-else class="text-xl text-red-700">
            Access Denied.
        </p>
        <NuxtLink to="/" class="text-blue-500 hover:underline block mt-4">
            Click here to return immediately
        </NuxtLink>
    </div>
  </div>
</template>