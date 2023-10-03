export class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById('navBar');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.render();
  }

  render() {
    const favoriteCount = this.querySelector('.count');
    // Favorite count
    window.addEventListener('onChangeFavoriteList', () => {
      if (app.store.favoriteList.length) {
        favoriteCount.classList.add('visible');
        favoriteCount.textContent = app.store.favoriteList.length;
      } else {
        favoriteCount.classList.remove('visible');
      }
    });
  }
}
