// src/main.js
import { initRouter } from './router.mjs';
import { checkAuthState } from './auth.mjs';

document.addEventListener('DOMContentLoaded', () => {
  checkAuthState();
  initRouter();
});
