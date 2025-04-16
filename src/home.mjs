export function renderHome() {
    document.getElementById("app").innerHTML = `
      <section class="home">
        <h1>Welcome to The Complete Recipe Meal Prep Planner</h1>
        <p>Designed for busy individuals who want to eat well without stress.</p>
        <a href="#/search" class="btn">Search Recipes</a>
      </section>
    `;
  }
  