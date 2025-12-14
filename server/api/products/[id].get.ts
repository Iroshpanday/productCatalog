// server/api/products/[id].get.ts

import { mockProducts } from './data';
import { defineEventHandler } from 'h3';

// This handler will respond to GET requests to /api/products/:id
export default defineEventHandler((event) => {
  // Read the dynamic parameter (id) from the request event
  const productId = event.context.params?.id;

  // Use Number() to ensure type consistency (id in data is a number)
  const product = mockProducts.find(p => p.id === Number(productId));

  if (!product) {
    // Nuxt/Nitro handles error responses seamlessly
    throw createError({
      statusCode: 404,
      statusMessage: `Product with ID ${productId} not found`,
    });
  }

  return product;
});