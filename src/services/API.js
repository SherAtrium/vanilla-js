const _API = {
  genres_url: '/src/mockData/genres.json',
  all_games_url: '/src/mockData/games.json',

  async fetchGenres() {
    try {
      const response = await fetch(this.genres_url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error('Handled message: ', error.message);
    }
  },

  async fetchAllGames() {
    try {
      const response = await fetch(this.all_games_url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error('Handled message: ', error.message);
    }
  },
};

export async function loadGenres() {
  app.store.genres = await _API.fetchGenres();
}

export async function loadAllGames() {
  app.store.games = await _API.fetchAllGames();
}

export async function getGamesByGenreId(id) {
  const data = await _API.fetchAllGames();
  app.store.games = data.filter((game) =>
    game.genres.find((genre) => genre.id === id)
  );
}
