import { loadCSS } from '../../utils/loadCSS.js';

class GameList extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    loadCSS('/src/components/GameList/GameList.css', style);

    this.root.appendChild(style);
  }

  connectedCallback() {
    const template = document.getElementById('gameList');
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    this.root.querySelector('.template').style.opacity = 0;
    this.root.querySelector('.template').scrollTo(0, 0);

    this.render();
  }

  filterDataByGenre(id) {
    const result = {
      data: [],
      name: '',
    };
    result.data = app.store.games.filter((game) =>
      game.genres.find((genre) => {
        if (genre.id === id) {
          result.name = genre.name;
          return true;
        }
        return false;
      })
    );

    return result;
  }

  render() {
    if (app.store.games) {
      const genreId = Number(this.dataset.genreId);
      const filteredData = genreId
        ? this.filterDataByGenre(Number(genreId))
        : null;
      let games = filteredData ? filteredData.data : app.store.games;

      this.root.querySelector('h2').textContent = filteredData
        ? filteredData.name
        : 'All Games';

      if (games.length === 0) {
        this.root.querySelector('div.list').innerHTML =
          'No data has been found :(';
      } else {
        const gameCards = games.map((game) => {
          const gameCard = document.createElement('game-card');
          gameCard.dataset.gameId = JSON.stringify(game.id);
          return gameCard;
        });
        this.root.querySelector('div.list').append(...gameCards);
      }
    } else {
      this.root.querySelector('h2').textContent = 'Loading...';
    }
  }
}

customElements.define('game-list', GameList);
