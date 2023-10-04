const Store = {
  genres: [],
  games: [],
  favoriteList: [],
  dynamicSearch: '',
};

const _proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;

    if (property === 'genres') {
      window.dispatchEvent(new Event('onChangeGenres'));
    }

    if (property === 'games') {
      window.dispatchEvent(new Event('onChangeGames'));
    }

    if (property === 'favoriteList') {
      window.dispatchEvent(new Event('onChangeFavoriteList'));
    }

    console.warn('store was updated');

    return true;
  },
});

export default _proxyStore;
