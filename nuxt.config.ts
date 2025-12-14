// nuxt.config.ts

export default defineNuxtConfig({
  // Enable the Pinia module
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],
    image: {
      // This is necessary because our image URLs start with 'https://picsum.photos'
      domains: ['picsum.photos'], 
    },

  // Set Nuxt 4 compatibility mode
  future: {
    compatibilityVersion: 4,
  },

  // OPTIONAL: Recommended for cleaner organization in Nuxt 4
  // All other Nuxt files (pages, components, etc.) will be placed in the `app` directory
  srcDir: 'app/',

  devtools: { enabled: true }
})