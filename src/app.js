import { loadGenres } from './services/API.js';
import Store from './store/Store.js';
import Router from './services/Router.js';

// Load Components
import './components/Genres/Genres.js';

window.app = {};
app.store = Store;
app.router = Router;

// It is better to wait for the event for manipulation
window.addEventListener('DOMContentLoaded', () => {
  loadGenres();
  // app.router.init();
});
