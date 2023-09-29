window.addEventListener('DOMContentLoaded', () => {
  const genresElement = document.querySelector('.genres');

  window.addEventListener('onChangeGenres', () => {
    if (app.store.genres) {
      app.store.genres.forEach((item) => {
        const template = `
          <li class="genre">
            <a href="${item.id}">
              <img src="${item.image_background}" alt="${item.slug}">
              <p>${item.name}</p>
            </a>
          </li>
        `;

        genresElement.innerHTML += template;
      });
    }
  });
});
