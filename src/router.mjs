// src/router.mjs
import { renderHome } from './home.mjs';
import { renderSearch } from './search.mjs';
import { renderSignUp } from './auth.mjs';
import { renderLogin } from './auth.mjs';
import { renderFavorites } from "./utils.js";

const routes = {
  "/": renderHome,
  "/search": renderSearch,
  "/signup": renderSignUp,
  "/login": renderLogin,
  "/favorites": renderFavorites,
};

export function initRouter() {
  window.addEventListener('hashchange', () => route(window.location.hash));
  route(window.location.hash);
}

function route(hash) {
  const path = hash.replace('#', '') || '/';
  const render = routes[path];
  if (render) {
    render();
  } else {
    document.getElementById('app').innerHTML = `<h2>404 - Page Not Found</h2>`;
  }
}
