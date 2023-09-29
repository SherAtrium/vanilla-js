import { loadCSS } from '../../utils/loadCSS.js';

class GameList extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    this.root.appendChild(style);

    loadCSS('/src/components/GameList/GameList.css', style);
  }

  connectedCallback() {
    const template = document.getElementById('gameList');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener('onChangeGames', () => {
      this.render();
    });
    this.render();
  }

  render() {
    if (app.store.games) {
      this.root.querySelector('h2').textContent = 'All Games';

      app.store.games.forEach((game) => {
        const gameCard = document.createElement('game-card');
        gameCard.dataset.gameId = JSON.stringify(game.id);
        // TODO: call game-card component
        this.root.appendChild(gameCard);
      });
    } else {
      this.root.querySelector('h2').textContent = 'Loading...';
    }
  }
}

customElements.define('game-list', GameList);
