import Router from './router/Router.js';
import { middleware } from './services/api.js';
import Store from './store/Store.js';

// Load Components
import './components/GameCard/GameCard.js';
import './components/GameList/GameList.js';
import './components/Genres/Genres.js';

window.app = {};
app.store = Store;
app.router = Router;

// It is better to wait for the event for manipulation
window.addEventListener('DOMContentLoaded', () => {
  Promise.all([middleware.loadGenres(), middleware.loadAllGames()])
    .then(() => {
      app.router.init();
    })
    .catch((e) => console.error(`Error message: ${e.message}`));
});
