import { middleware } from '../services/api.js';
import { INPUT_DEBOUNCE_MS } from '../utils/constants.js';

export class Navbar extends HTMLElement {
  constructor() {
    super();

    this.timeoutId = null;
  }

  connectedCallback() {
    const template = document.getElementById('navBar');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }

  render() {
    const favoriteCount = this.querySelector('.count');
    // Favorite count
    window.addEventListener('onChangeFavoriteList', () => {
      if (app.store.favoriteList.length) {
        favoriteCount.classList.add('visible');
        favoriteCount.textContent = app.store.favoriteList.length;
      } else {
        favoriteCount.classList.remove('visible');
      }
    });

    this.querySelector('.searchInput').addEventListener('input', (event) => {
      // using debounce to prevent multiple requests
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        middleware.filterGamesByName(event.target.value);
      }, INPUT_DEBOUNCE_MS);
    });
  }
}
