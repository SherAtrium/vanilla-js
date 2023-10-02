window.addEventListener('DOMContentLoaded', () => {
  const genresElement = document.querySelector('.genres');

  window.addEventListener('onChangeGenres', () => {
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

        genresElement.innerHTML += template;
      });
    }
  });

  window.addEventListener('onChangeRoute', () => {
    const paramId = history.state.paramId;

    document.querySelectorAll('.genre').forEach((genre) => {
      if (genre.dataset.id !== paramId && genre.classList.contains('active')) {
        genre.classList.remove('active');
      }

      if (genre.dataset.id === paramId) {
        genre.classList.add('active');
      }
    });
  });
});
