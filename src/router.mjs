// src/router.mjs
import { renderHome } from './home.mjs';
import { renderSearch } from './search.mjs';
import { renderLogin } from './auth.mjs';

const routes = {
  '/': renderHome,
  '/search': renderSearch,
  '/login': renderLogin
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
