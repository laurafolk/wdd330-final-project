import { getFromLocalStorage, saveToLocalStorage } from './utils.js';

async function fetchRecipes(searchTerm) {
  // const url = "https://tasty.p.rapidapi.com/recipes/list";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "88aac24a55msh80b25efa593281ep1b29d7jsnfd44213ed1b4",
  //     "x-rapidapi-host": "tasty.p.rapidapi.com",
  //   },
  // };
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  try {
    const response = await fetch(url); //, options);
    const data = await response.json();

    // Transform the data into a usable format
    return data.meals.map((recipe) => ({
      id: recipe.idMeal,
      title: recipe.strMeal,
      description: recipe.strInstructions, // `Calories: ${recipe.nutrition?.calories || "N/A"}`,
      image: recipe.strMealThumb,
    }));
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
}

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
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "<p>Searching...</p>";

    const data = await fetchRecipes(query);
    // const data = query
    //   ? allRecipes.filter(recipe => recipe.title.toLowerCase().includes(query))
    //   : allRecipes;

    const favorites = getFromLocalStorage("favorites") || [];

    resultsContainer.innerHTML = data.map(recipe => {
      const isSaved = favorites.some(fav => fav.id === recipe.id);
      return `
        <div class="recipe-card">
          <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <button data-id="${recipe.id}" class="fav-btn">
            ${isSaved ? "Remove from Favorites" : "Save to Favorites"}
          </button>
        </div>
      `;
    }).join("");

    // Favorite button functionality
    document.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const recipeId = btn.dataset.id;
        const recipe = data.find(r => r.id == recipeId);
        let updatedFavorites = getFromLocalStorage("favorites") || [];

        if (updatedFavorites.some(r => r.id == recipeId)) {
          updatedFavorites = updatedFavorites.filter(r => r.id != recipeId);
          btn.textContent = "Save to Favorites";
        } else {
          updatedFavorites.push(recipe);
          btn.textContent = "Remove from Favorites";
        }

        saveToLocalStorage("favorites", updatedFavorites);
      });
    });
  });
}
