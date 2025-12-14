# 🚀 Nuxt 3 Product Catalog (SSR)

This is a modern e-commerce product catalog application built with **Nuxt 3** using a Server-Side Rendering (SSR) architecture. It features state management with Pinia, authentication middleware, a custom Nitro API, and a clean user interface powered by Tailwind CSS.

## ✨ Key Features Implemented

| Feature | Description | Status |
| :--- | :--- | :--- |
| **Server-Side Rendering (SSR)** | Fast initial load and SEO-friendly rendering using Nuxt's universal mode. | ✅ |
| **Nitro API** | Custom API layer (`/server/api`) used for fetching a large set of mock product data. | ✅ |
| **Pinia State Management** | Handles the shopping cart state (`cart.ts`), persistent across refreshes using `useStorage`. | ✅ |
| **Authentication Middleware** | Protects the `/checkout` route using the `auth.ts` middleware. Includes a **2-second redirect delay** for improved user experience. | ✅ |
| **Persistent Layout** | Uses `app/layouts/default.vue` to provide a sticky, site-wide navigation bar with Cart status and Auth controls. | ✅ |
| **Dynamic Routes** | Product Detail pages (`/products/:id`) use dynamic routing and fetch specific data. | ✅ |
| **Pagination** | Functional component to navigate the expanded product list on the homepage. | ✅ |
| **Optimized UI/UX** | Uses Nuxt Image, half-price display, and a clean Tailwind aesthetic with a persistent navbar. | ✅ |

## 🛠️ Tech Stack

* **Framework:** Nuxt 3
* **State Management:** Pinia
* **Styling:** Tailwind CSS
* **Server:** Nitro (built-in)
* **API:** Local Nitro Server Routes (`/server/api`)
* **Language:** TypeScript

## ⚙️ Project Setup and Run

Follow these steps to get the project running on your local machine.

### Prerequisites

* Node.js (LTS version, e.g., 18+)
* npm (or yarn/pnpm)

### 1. Installation

Assuming you have the final project folder (`nuxt-product-catalog`):

```bash
cd nuxt-product-catalog

# Install dependencies
npm install

2. Development Server
Start the application in development mode with hot-reloading:

Bash

npm run dev
The application will be accessible at: http://localhost:3000

3. Testing the Secure Flow
Visit http://localhost:3000 and add a few products to the cart.

Click the "Go to Secure Checkout" button in the navbar.

If Logged Out: It will show "Access Denied. Redirecting in 2 seconds..." before returning to the homepage.

Click "Login (Simulate)".

Now, click "Go to Secure Checkout". The protected page will load successfully.
