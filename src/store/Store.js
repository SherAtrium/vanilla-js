const Store = {
  genres: null,
  games: null,
  favoriteList: null,
};

const _proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;

    if (property === 'genres') {
      window.dispatchEvent(new Event('onChangeGenres'));
    }

    if ((property = 'games')) {
      window.dispatchEvent(new Event('onChangeGames'));
    }

    if (property === 'favoriteList') {
      window.dispatchEvent(new Event('onChangeFavoriteList'));
    }

    return true;
  },
});

export default _proxyStore;
