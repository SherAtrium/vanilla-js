const API = {
  _genres_url: 'src/mockData/genres.json',
  _all_games_url: 'src/mockData/games.json',

  async fetchGenres() {
    const response = await fetch(API._genres_url);
    const data = await response.json();
    return data.results;
  },

  async fetchAllGames() {
    const response = await fetch(this._all_games_url);
    const data = await response.json();
    return data.results;
  },
};

export async function loadGenres() {
  app.store.genres = await API.fetchGenres();
}

export async function loadAllGames() {
  app.store.games = await API.fetchAllGames();
}
