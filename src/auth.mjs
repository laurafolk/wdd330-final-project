// src/auth.mjs
export function renderLogin() {
    document.getElementById('app').innerHTML = `
      <h2>Login / Sign Up</h2>
      <form id="auth-form">
        <input type="text" id="username" placeholder="Enter your name" required />
        <button type="submit">Continue</button>
      </form>
    `;
  
    document.getElementById('auth-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      if (username) {
        localStorage.setItem('currentUser', username);
        alert(`Welcome, ${username}!`);
        window.location.hash = '/';
      }
    });
  }
  
  export function checkAuthState() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      console.log(`Logged in as ${user}`);
    }
  }
  