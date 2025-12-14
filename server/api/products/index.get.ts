// server/api/products/index.get.ts

import { mockProducts } from './data';
import { defineEventHandler } from 'h3'; // Helper from Nitro's underlying router

// This handler will respond to GET requests to /api/products
export default defineEventHandler(() => {
  return {
    products: mockProducts,
    timestamp: new Date().toISOString(), // Optional: show when the data was fetched
  };
});