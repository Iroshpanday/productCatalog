<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { useAuth } from '~/middleware/auth';
import { storeToRefs } from 'pinia';

// 1. Get Cart State
const cartStore = useCartStore();
const { cartCount } = storeToRefs(cartStore);

// 2. Get Auth State
const { isLoggedIn, login, logout } = useAuth();
</script>

<template>
  <div>
    <header class="bg-white shadow-md sticky top-0 z-10">
      <div class="container mx-auto p-4 flex justify-between items-center">
        
        <NuxtLink to="/" class="text-3xl font-extrabold text-green-600 hover:text-green-700 transition">
          Nuxt Catalog
        </NuxtLink>

        <div class="flex items-center space-x-4">
          
          <div class="hidden sm:block">
            <button 
              v-if="!isLoggedIn"
              @click="login" 
              class="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Login (Simulate)
            </button>
            <button 
              v-else
              @click="logout" 
              class="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
          
          <NuxtLink 
            to="/checkout" 
            class="bg-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-purple-700 transition hidden md:block"
          >
            Go to Secure Checkout ({{ isLoggedIn ? 'Unlocked' : 'Locked' }})
          </NuxtLink>

          <div class="relative bg-yellow-500 text-white py-2 px-4 rounded-full font-bold shadow-lg">
            Cart ({{ cartCount }})
          </div>

        </div>
      </div>
    </header>
    <main>
      <slot />
    </main>
    </div>
</template>