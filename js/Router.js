class Router {
  constructor(routes) {
    this.routes = routes;
    this.rootElem = document.getElementById('main-container');
  }

  init() {
    if (!window.location.hash) {
      this.goToRoute('news-list.html');
    } else {
      this.goToRoute(`${window.location.hash.substr(1)}.html`);
    }
    window.addEventListener('hashchange', () => {
      this.hasChanged();
    });
  }

  hasChanged() {
    this.routes.forEach(route => {
      if (route.isActiveRoute(window.location.hash.substr(1))) {
        this.goToRoute(route.htmlName);
      }
    });
  }

  goToRoute(htmlName) {
    this.rootElem.innerHTML = '';
    const url = `views/${htmlName}`;
    fetch(url)
      .then((res) => {
        return res.text();
      })
      .then((html) => {
        const parser = new DOMParser();
        let view = parser.parseFromString(html, 'text/html');
        view = view.querySelector('.view');
        this.rootElem.append(view);
    });
  }
}
