// app/stores/cart.ts

import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

// 1. Define types
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// 2. Define the store
export const useCartStore = defineStore('cart', {
  // 💡 Key concept: useStorage from VueUse makes the state persistent!
  // It defaults to localStorage on the client.
  state: () => ({
    // Initialize state with useStorage to make it persistent
    items: useStorage<CartItem[]>('nuxt-cart-items', []),
  }),

  getters: {
    // Calculate total number of items
    cartCount: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    // Calculate total price
    cartTotal: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0),
  },

  actions: {
    // 3. Action to add a product to the cart
    addProductToCart(product: { id: number, name: string, price: number }) {
      const existingItem = this.items.find(item => item.id === product.id);

      if (existingItem) {
        // If product exists, increment quantity
        existingItem.quantity += 1;
      } else {
        // If product is new, add it with quantity 1
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        });
      }
    },
    
    // Action to remove an item or decrease quantity
    removeItem(productId: number) {
      const existingItem = this.items.find(item => item.id === productId);
      
      if (existingItem) {
          if (existingItem.quantity > 1) {
              existingItem.quantity -= 1; // Decrease quantity
          } else {
              // Remove the item completely if quantity is 1
              this.items = this.items.filter(item => item.id !== productId);
          }
      }
    },
    
    // Action to clear the cart
    clearCart() {
      this.items = [];
    }
  },
});