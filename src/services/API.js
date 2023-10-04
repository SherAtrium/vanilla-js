import { ALL_GAMES_URL, GENRES_URL } from '../utils/constants.js';

export const api = {
  async fetchGenres() {
    try {
      const response = await fetch(GENRES_URL);
      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error('Handled message: ', error.message);
    }
  },

  async fetchAllGames() {
    try {
      const response = await fetch(ALL_GAMES_URL);
      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error('Handled message: ', error.message);
    }
  },
};

export const middleware = {
  async loadGenres() {
    const data = await api.fetchGenres();
    if (data) {
      app.store.genres = data;
    }
  },

  async loadAllGames() {
    const data = await api.fetchAllGames();
    if (data) {
      app.store.games = data;
    }
  },

  async getGamesByGenreId(id) {
    let data = await api.fetchAllGames();
    if (data) {
      if (app.store.dynamicSearch) {
        data = data.filter((game) =>
          game.name
            .toLowerCase()
            .includes(app.store.dynamicSearch.toLowerCase())
        );
      }

      app.store.games = data.filter((game) =>
        game.genres.find((genre) => genre.id === id)
      );
    }
  },

  async filterGamesByName(value) {
    const data = await api.fetchAllGames();
    if (data) {
      app.store.dynamicSearch = value.trim();
      app.store.games = data.filter((game) =>
        game.name.toLowerCase().includes(value.trim().toLowerCase())
      );
    }
  },
};
