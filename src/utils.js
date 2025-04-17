export function $(selector) {
    return document.querySelector(selector);
  }
  
  export function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || null;
  }

  export function renderFavorites() {
    document.getElementById("app").innerHTML = `
      <section class="home">
        <h1>These are your favorites</h1>
        <p>Coming soon...</p>
        <a href="#/search" class="btn">Search Recipes</a>
      </section>
    `;
  }