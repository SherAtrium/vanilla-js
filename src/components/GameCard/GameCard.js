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

  getPlatformIcon = (name) => {
    const availableIcons = {
      playstation: '/assets/icons/playstation4.svg',
      linux: '/assets/icons/linux.svg',
      mobile: '/assets/icons/mobile.svg',
      'xbox-one': '/assets/icons/xbox-one.svg',
      'nintendo-switch': '/assets/icons/nintendo-switch.svg',
    };

    if (name.startsWith('playstation')) {
      return availableIcons.playstation;
    }

    if (availableIcons[name]) {
      return availableIcons[name];
    }

    return null;
  };

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
      button.textContent = 'Remove from favorite';
      button.classList.add('active');
    } else {
      button.textContent = 'Add to favorite';
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
    console.log('render');
    const id = JSON.parse(this.dataset.gameId);
    const gameData = this.findDataById(id);

    const $ = (el) => this.querySelector(el);
    const favoriteButton = $('.favoriteButton');
    this.toggleFavoriteButton(favoriteButton, gameData);

    if (gameData) {
      gameData.platforms.forEach(this.renderPlatformIcons);

      $('img').src = gameData.background_image;
      $('a.title').textContent = gameData.name;
      $('a.title').href = ''; // TODO: Implement game-info page
      $('.releaseDateValue').textContent = gameData.released;
      $('.relatedGenres .relatedGenresValue').textContent = gameData.genres
        .map((i) => i.name)
        .join(', ');

      // FAVORITE LIST LOGIC -> REFACTOR
      favoriteButton.textContent = 'Add to favorite';
      favoriteButton.onclick = () => this.onFavoriteButtonClick(gameData);

      window.addEventListener('onChangeFavoriteList', () =>
        this.toggleFavoriteButton(favoriteButton, gameData)
      );
    }
  }
}
