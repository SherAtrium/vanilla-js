class GameCard extends HTMLElement {
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

  render() {
    const id = JSON.parse(this.dataset.gameId);
    const gameData = this.findDataById(id);

    if (gameData) {
      this.querySelector('img').src = gameData.background_image;

      gameData.platforms.forEach((i) => {
        const iconUrl = this.getPlatformIcon(i.platform.slug);
        if (iconUrl) {
          const template = `
          <li>
            <img src="${iconUrl}">
          </li>
        `;
          this.querySelector('ul.platforms').innerHTML += template;
        }
      });

      this.querySelector('a.title').textContent = gameData.name;
      this.querySelector('.releaseDateValue').textContent = gameData.released;
      this.querySelector('.relatedGenres .relatedGenresValue').textContent =
        gameData.genres.map((i) => i.name).join(', ');
      // console.log(gameData);
    } else {
      // Game not found
    }
  }
}

customElements.define('game-card', GameCard);
