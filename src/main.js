import { initRouter } from './router.mjs';
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
  initRouter(routes);

  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const path = btn.dataset.route;
      history.pushState({}, '', path);
      initRouter(routes);
    });
  });

  window.addEventListener('popstate', () => initRouter(routes));
});
