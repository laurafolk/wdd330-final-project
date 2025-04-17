import { router } from './router.mjs';
import { renderHome } from './home.mjs';
import { renderSearch } from './search.mjs';
import { renderLogin } from './auth.mjs';
import { renderFavorites } from './utils.js';

const routes = {
  '/': renderHome,
  '/search': renderSearch,
  '/login': renderLogin,
  '/favorites': renderFavorites
};

document.addEventListener('DOMContentLoaded', () => {
  router(routes);

  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const path = btn.dataset.route;
      history.pushState({}, '', path);
      router(routes);
    });
  });

  window.addEventListener('popstate', () => router(routes));
});
