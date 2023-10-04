import { getIdFromPathname } from './utils.js';

const Router = {
  init: () => {
    document.querySelectorAll('a.link').forEach((a) => {
      a.addEventListener('click', (event) => {
        event.preventDefault();
        const url = event.currentTarget.getAttribute('href');
        if (url !== location.pathname) {
          Router.go(url);
        }
      });
    });

    // when we go back
    window.addEventListener('popstate', (event) => {
      Router.go(event.state.route, false);
    });

    // We want to render initial component when first page opens or manually refresh happens
    const path = location.pathname === '/' ? '/all-games' : location.pathname;
    Router.go(path);
  },

  // addToHistory - when user goes back we don't need to save it to history
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      // in state we can add more stuff:
      // like screen position, when we go to some page and go back we can scroll to the previous position.
      // and we need route in state that we can get access to it within popstate listener
      history.pushState(
        { route, paramId: getIdFromPathname(route) },
        '',
        route
      );

      window.dispatchEvent(new Event('onChangeRoute'));
    }

    let pageElement = null;

    switch (route) {
      case '/all-games':
        pageElement = document.createElement('game-list');
        break;

      default:
        if (route.startsWith('/genre')) {
          pageElement = document.createElement('game-list');
          const paramId = history.state.paramId;
          pageElement.dataset.genreId = paramId;
        }
        break;
    }

    if (pageElement) {
      const main = document.querySelector('main');

      // This will be rendered many times
      // without clearing innerHTML we all the time push element to the DOM
      // main.innerHTML = '';
      for (let element of main.children) {
        if (element.tagName !== 'NAV-BAR') {
          element.remove();
        }
      }

      main.appendChild(pageElement);

      window.scrollX = 0;
      window.scrollY = 0;
    } else {
      document.querySelector('main').innerHTML = 'Oops, 404 Page Not Found!';
    }
  },
};

export default Router;
