import { AVAILABLE_ICONS } from '../utils/constants.js';

export class GameCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById('gameCard');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }

  findDataById = (id) => {
    if (app.store.games) {
      return app.store.games.find((game) => game.id === id);
    }
    return null;
  };

  getPlatformIcon = (name) =>
    name.startsWith('playstation')
      ? AVAILABLE_ICONS.playstation
      : AVAILABLE_ICONS[name];

  renderPlatformIcons = (platform) => {
    const iconUrl = this.getPlatformIcon(platform.platform.slug);
    if (iconUrl) {
      const template = `
        <li>
          <img src="${iconUrl}">
        </li>
      `;
      this.querySelector('ul.platforms').innerHTML += template;
    }
  };

  checkFavoriteList = (id) => {
    return app.store.favoriteList.find((item) => item.id === id);
  };

  toggleFavoriteButton = (button, gameData) => {
    if (this.checkFavoriteList(gameData.id)) {
      button.innerText = 'Remove from favorite';
      button.classList.add('active');
    } else {
      button.innerText = 'Add to favorite';
      button.classList.remove('active');
    }
  };

  onFavoriteButtonClick = (gameData) => {
    if (this.checkFavoriteList(gameData.id)) {
      app.store.favoriteList = app.store.favoriteList.filter(
        (item) => item.id !== gameData.id
      );
    } else {
      app.store.favoriteList = [...app.store.favoriteList, gameData];
    }
  };

  render() {
    const id = Number(this.dataset.gameId);
    const gameData = this.findDataById(id);
    const $ = (el) => this.querySelector(el);
    const favoriteButton = $('.favoriteButton');

    if (gameData) {
      gameData.platforms.forEach(this.renderPlatformIcons);

      $('img').src = gameData.background_image;
      $('a.title').textContent = gameData.name;
      $('a.title').href = '#'; // TODO: Implement game-info page
      $('.releaseDateValue').textContent = gameData.released;
      $('.relatedGenres .relatedGenresValue').textContent = gameData.genres
        .map((i) => i.name)
        .join(', ');
      favoriteButton.innerText = 'Add to favorite'; // #1
      favoriteButton.onclick = () => this.onFavoriteButtonClick(gameData); // #2

      window.addEventListener('onChangeFavoriteList', () =>
        this.toggleFavoriteButton(favoriteButton, gameData)
      );
      this.toggleFavoriteButton(favoriteButton, gameData); // #3
    }
  }
}
