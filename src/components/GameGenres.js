export class GameGenres extends HTMLElement {
  constructor() {
    super();

    this.routeHandler = this.setActiveGenre.bind(this);
    window.addEventListener('onChangeRoute', this.routeHandler);
  }

  connectedCallback() {
    const template = document.getElementById('gameGenres');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }

  setActiveGenre() {
    // We will need to specify this from Router.JS
    const paramId = history.state.paramId;

    document.querySelectorAll('.genre').forEach((genre) => {
      if (genre.dataset.id !== paramId && genre.classList.contains('active')) {
        genre.classList.remove('active');
      }

      if (genre.dataset.id === paramId) {
        genre.classList.add('active');
      }
    });
  }

  disconnectedCallback() {
    window.removeEventListener('onChangeRoute', this.routeHandler);
  }

  render() {
    const ulElement = this.querySelector('ul.genres');

    if (app.store.genres) {
      app.store.genres.forEach((item) => {
        const template = `
            <li class="genre" data-id="${item.id}">
              <a href="/genre/${item.id}" class="link">
                <img src="${item.image_background}" alt="${item.slug}">
                <p>${item.name}</p>
              </a>
            </li>
          `;

        ulElement.innerHTML += template;
      });
    } else {
      this.textContent = 'Loading...';
    }
  }
}
