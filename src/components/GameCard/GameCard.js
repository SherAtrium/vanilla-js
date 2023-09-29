class GameCard extends HTMLElement {
  constructor() {
    super();
  }

  getDataById = (id) => {
    if (app.store.games) {
      return app.store.games.find((game) => game.id === id);
    }
    return null;
  };

  connectedCallback() {
    const template = document.getElementById('gameCard');
    const content = template.content.cloneNode(true);

    this.appendChild(content);
    this.render();
  }

  render() {
    const id = JSON.parse(this.dataset.gameId);
    const gameData = this.getDataById(id);

    if (gameData) {
      this.querySelector('img').src = gameData.background_image;
    } else {
      // Game not found
    }
  }
}

customElements.define('game-card', GameCard);
