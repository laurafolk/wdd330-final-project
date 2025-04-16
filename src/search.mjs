import { getFromLocalStorage, saveToLocalStorage } from './utils.js';

export async function renderSearch() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <section class="search">
      <h2>Find a Recipe</h2>
      <input type="text" id="searchInput" placeholder="e.g. Chicken Alfredo">
      <button id="searchBtn">Search</button>
      <div id="results"></div>
    </section>
  `;

  document.getElementById("searchBtn").addEventListener("click", async () => {
    const query = document.getElementById("searchInput").value.trim();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "<p>Searching...</p>";

    try {
      const res = await fetch(`https://api.example.com/recipes?q=${query}`);
      const data = await res.json();

      const favorites = getFromLocalStorage("favorites") || [];

      resultsContainer.innerHTML = data.recipes.map(recipe => {
        const isSaved = favorites.some(fav => fav.id === recipe.id);
        return `
          <div class="recipe-card">
            <h3>${recipe.title}</h3>
            <p>${recipe.description || "No description."}</p>
            <button data-id="${recipe.id}" class="fav-btn">
              ${isSaved ? "Remove from Favorites" : "Save to Favorites"}
            </button>
          </div>
        `;
      }).join("");

      // Attach listeners for favorite buttons
      document.querySelectorAll(".fav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const recipeId = btn.dataset.id;
          const recipe = data.recipes.find(r => r.id === recipeId);
          let updatedFavorites = getFromLocalStorage("favorites") || [];

          if (updatedFavorites.some(r => r.id === recipeId)) {
            updatedFavorites = updatedFavorites.filter(r => r.id !== recipeId);
            btn.textContent = "Save to Favorites";
          } else {
            updatedFavorites.push(recipe);
            btn.textContent = "Remove from Favorites";
          }

          saveToLocalStorage("favorites", updatedFavorites);
        });
      });

    } catch (err) {
      resultsContainer.innerHTML = "<p>Failed to fetch recipes.</p>";
      console.error(err);
    }
  });
}

  