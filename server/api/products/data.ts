// server/api/products/data.ts

// Data structure definition (for reference, not required in the file)
/*
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}
*/

export const mockProducts = [
  // --- Original 4 Products ---
  {
    id: 1,
    name: 'Nuxt Masterpiece T-Shirt',
    price: 29.99,
    description: 'A comfortable cotton T-shirt featuring the Nuxt logo. Perfect for a developer.',
    imageUrl: 'https://picsum.photos/id/1015/600/400',
    category: 'Apparel',
  },
  {
    id: 2,
    name: 'Vue.js Coffee Mug',
    price: 14.50,
    description: 'Start your coding day with a hot drink in this Vue.js themed mug.',
    imageUrl: 'https://picsum.photos/id/1025/600/400',
    category: 'Home Goods',
  },
  {
    id: 3,
    name: 'Fullstack Developer Sticker Pack',
    price: 9.99,
    description: 'A pack of high-quality vinyl stickers for your laptop, covering Vue, Nuxt, and Node.',
    imageUrl: 'https://picsum.photos/id/1031/600/400',
    category: 'Accessories',
  },
  {
    id: 4,
    name: 'Nuxt 4 Launch Poster',
    price: 19.99,
    description: 'A limited edition poster celebrating the release of Nuxt 4.',
    imageUrl: 'https://picsum.photos/id/1043/600/400',
    category: 'Art',
  },
  // --- 8 New Products ---
  {
    id: 5,
    name: 'TypeScript Cheat Sheet Mousepad',
    price: 15.99,
    description: 'A large mousepad with common TypeScript syntax for quick reference.',
    imageUrl: 'https://picsum.photos/id/1053/600/400',
    category: 'Accessories',
  },
  {
    id: 6,
    name: 'Nitro Server Hoodie',
    price: 59.99,
    description: 'Warm and cozy hoodie, perfect for those long coding nights.',
    imageUrl: 'https://picsum.photos/id/1060/600/400',
    category: 'Apparel',
  },
  {
    id: 7,
    name: 'Pinia State Management Book',
    price: 34.99,
    description: 'A comprehensive guide to modern state management in Vue 3 and Nuxt.',
    imageUrl: 'https://picsum.photos/id/1070/600/400',
    category: 'Books',
  },
  {
    id: 8,
    name: 'Tailwind CSS Starter Kit',
    price: 24.99,
    description: 'A digital kit with pre-built components for rapid UI development.',
    imageUrl: 'https://picsum.photos/id/1080/600/400',
    category: 'Software',
  },
  {
    id: 9,
    name: 'Modern Web Dev Backpack',
    price: 89.99,
    description: 'Durable backpack with padded sleeves for your laptop and gadgets.',
    imageUrl: 'https://picsum.photos/id/1090/600/400',
    category: 'Accessories',
  },
  {
    id: 10,
    name: 'Composition API Desk Mat',
    price: 22.99,
    description: 'Large desk mat featuring elegant examples of the Vue Composition API.',
    imageUrl: 'https://picsum.photos/id/1099/600/400',
    category: 'Home Goods',
  },
  {
    id: 11,
    name: 'SSR Optimized Hat',
    price: 20.99,
    description: 'Keep the sun out of your eyes while your code runs blazing fast.',
    imageUrl: 'https://picsum.photos/id/1110/600/400',
    category: 'Apparel',
  },
  {
    id: 12,
    name: 'Nuxt Module Developer Guide',
    price: 49.99,
    description: 'The definitive guide to extending Nuxt with custom modules.',
    imageUrl: 'https://picsum.photos/id/1120/600/400',
    category: 'Books',
  },
];