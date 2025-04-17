export function renderHome() {
    document.getElementById("app").innerHTML = `
      <section class="home">
        <h1>Welcome to The Complete Recipe Meal Prep Planner</h1>
        <p>Designed for busy individuals who want to eat well without stress, help make plan meals effortlessly. You can search recipes, save your favorites and help make your weekly meal prep 
          a little easier</p>
        <a href="#/search" class="btn">Search Recipes</a>
      </section>
    `;
  }
  