import { Router } from './router/router.js';
import { middleware } from './services/api.js';
import Store from './store/store.js';

import { GameCard } from './components/GameCard.js';
import { GameGenres } from './components/GameGenres.js';
import { GameList } from './components/GameList.js';
import { Navbar } from './components/NavBar.js';

// Defining Web Components
customElements.define('game-genres', GameGenres);
customElements.define('game-list', GameList);
customElements.define('game-card', GameCard);
customElements.define('nav-bar', Navbar);

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

    // Must be at the end all the time
    app.router.initialize();
  } catch (error) {
    throw new Error('Handled message:', error.message);
  }
});
