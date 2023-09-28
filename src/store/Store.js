const Store = {
  genres: null,
  games: null,
};

const _proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;

    if (property === 'genres') {
      window.dispatchEvent(new Event('onchangegenres'));
    }

    if ((property = 'games')) {
      window.dispatchEvent(new Event('onchangegames'));
    }

    return true;
  },
});

export default _proxyStore;

// Store logs
// window.addEventListener('onchangegenres', () =>
//   console.log('Store[genres] was updated:', app.store.genres)
// );

// window.addEventListener('onchangegames', () =>
//   console.log('Store[games] was updated:', app.store.games)
// );
