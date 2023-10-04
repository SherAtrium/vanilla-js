import Router from './router/router.js';
import { middleware } from './services/api.js';
import Store from './store/store.js';

import { GameCard } from './components/GameCard/GameCard.js';
import { GameGenres } from './components/GameGenres/GameGenres.js';
import { GameList } from './components/GameList/GameList.js';
import { Navbar } from './components/Navbar/Navbar.js';

// Defining web components
customElements.define('game-genres', GameGenres);
customElements.define('nav-bar', Navbar);
customElements.define('game-list', GameList);
customElements.define('game-card', GameCard);

window.app = {};
app.store = Store;
app.router = Router;

// It is better to wait for the event for manipulation
window.addEventListener('DOMContentLoaded', async () => {
  try {
    await Promise.all([middleware.loadGenres(), middleware.loadAllGames()]);
    const aside = document.querySelector('aside');
    const main = document.querySelector('main');

    const gameGenres = document.createElement('game-genres');
    const navBar = document.createElement('nav-bar');

    aside.appendChild(gameGenres);
    main.appendChild(navBar);

    // Should be at the end all the time
    app.router.init();
  } catch (error) {
    console.error(`Error message: ${error.message}`);
  }
});
