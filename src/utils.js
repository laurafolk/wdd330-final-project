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
    const favorites = getFromLocalStorage("favorites") || [];

    document.getElementById("app").innerHTML =
      `<section class="home">` +
      (favorites.length === 0
        ? `<h1>No favorites saved yet</h1>`
        : `<h1>These are your favorites</h1>` +
          favorites
            .map((recipe) => {
              return `
       <div class="recipe-card">
         <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
         <h3>${recipe.title}</h3>
         <p>${recipe.description}</p>
         <button data-id="${recipe.id}" class="fav-btn">
           Remove from Favorites
         </button>
       </div>
     `;
            })
            .join("")) +
      `</section>`;

    // Favorite button functionality
    document.querySelectorAll(".fav-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const recipeId = btn.dataset.id;
        const recipe = favorites.find((r) => r.id == recipeId);
        let updatedFavorites = getFromLocalStorage("favorites") || [];

        if (updatedFavorites.some((r) => r.id == recipeId)) {
          updatedFavorites = updatedFavorites.filter((r) => r.id != recipeId);
          btn.textContent = "Save to Favorites";
        } else {
          updatedFavorites.push(recipe);
          btn.textContent = "Remove from Favorites";
        }

        saveToLocalStorage("favorites", updatedFavorites);
        renderFavorites();
      });
    });
 }