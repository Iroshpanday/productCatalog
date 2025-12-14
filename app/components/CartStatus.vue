<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { cartCount, cartTotal } = storeToRefs(cartStore);
</script>

<template>
  <div class="fixed top-4 right-4 bg-yellow-500 text-white p-3 rounded-lg shadow-xl cursor-pointer hover:bg-yellow-600 transition">
    <span class="font-bold">🛒 Cart ({{ cartCount }})</span>
    <span v-if="cartCount > 0"> | Total: ${{ cartTotal.toFixed(2) }}</span>
  </div>
</template>