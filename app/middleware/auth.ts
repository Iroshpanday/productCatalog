// app/middleware/auth.ts

import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import { useStorage } from '@vueuse/core';

// 1. DUMMY LOGIN STATE (Persistent via localStorage/useStorage)
const isLoggedIn = useStorage<boolean>('is-logged-in', false); 

export default defineNuxtRouteMiddleware((to, from) => {
  // If we are on the server, we let it proceed to the page for initial SSR.
  if (process.server) {
    return; 
  }

  // --- Client-Side Logic ---

  const requiresAuth = to.meta.auth === true;
  const loginPath = '/'; 
  
  if (requiresAuth && !isLoggedIn.value) {
    console.log(`[Middleware] Blocking access to ${to.path}. User not logged in.`);
    
    // 💡 NEW: Return a promise that resolves after the delay.
    // This pauses the navigation, allowing the page to briefly show the content 
    // before the final redirect takes place.
    return new Promise((resolve) => {
      // Set the flag to indicate the user is being redirected
      to.meta.isRedirecting = true; 
      
      setTimeout(() => {
        // After 2 seconds, execute the actual navigation and resolve the promise
        navigateTo(loginPath);
        resolve(true); 
      }, 1000); // 1000 milliseconds = 1 seconds
    });
  }

  // If none of the above, proceed to the page immediately
});


// 💡 BONUS: A simple composable to toggle the login state for testing
export const useAuth = () => ({
    isLoggedIn,
    login: () => {
        isLoggedIn.value = true;
        alert('Logged In! Now you can access restricted pages.');
    },
    logout: () => {
        isLoggedIn.value = false;
        alert('Logged Out!');
    }
});