import { loadAllGames, loadGenres } from './services/API.js';
import Store from './store/Store.js';
import Router from './router/Router.js';

// Load Components
import './components/Genres/Genres.js';
import './components/GameList/GameList.js';
import './components/GameCard/GameCard.js';

window.app = {};
app.store = Store;
app.router = Router;

// It is better to wait for the event for manipulation
window.addEventListener('DOMContentLoaded', () => {
  Promise.all([loadGenres(), loadAllGames()])
    .then(() => {
      app.router.init();
    })
    .catch((e) => console.error(`Error message: ${e.message}`));
});
