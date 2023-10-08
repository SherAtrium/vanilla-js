import { middleware } from '../services/api.js';
import { getGenreTitleById } from '../utils/getGenreTitleById.js';
import { loadCSS } from '../utils/loadCSS.js';

export class GameList extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    loadCSS('/src/styles/GameList.css', style);

    this.root.appendChild(style);

    this.renderHandler = this.render.bind(this);
    window.addEventListener('onChangeGames', this.renderHandler);
  }

  connectedCallback() {
    const template = document.getElementById('gameList');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    this.root.querySelector('.template').style.opacity = 0;
    this.root.querySelector('.template').scrollTo(0, 0);

    if (this.dataset.genreId) {
      middleware.getGamesByGenreId(Number(this.dataset.genreId));
    } else {
      middleware.loadAllGames();
    }
  }

  disconnectedCallback() {
    window.removeEventListener('onChangeGames', this.renderHandler);
  }

  render() {
    const { games, genres } = app.store;
    const genreId = this.dataset.genreId;
    const $ = (el) => this.root.querySelector(el);

    $('h2').textContent = genreId
      ? getGenreTitleById(Number(genreId), genres)
      : 'All Games';

    // When we will filter, we need to clear content
    this.root.querySelector('div.list').textContent = '';

    if (games.length === 0) {
      $('div.list').innerHTML = 'No data has been found :(';
    } else {
      const gameCards = games.map((game) => {
        const gameCard = document.createElement('game-card');
        gameCard.dataset.gameId = JSON.stringify(game.id);
        return gameCard;
      });
      $('div.list').append(...gameCards);
    }
  }
}
