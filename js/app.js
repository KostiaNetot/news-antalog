
document.addEventListener('DOMContentLoaded', () => {
  // routerInitialization();
  UI.contentInitialization();
  initRouteActions();
});

const initRouteActions = () => {
  window.addEventListener('hashchange', () => {
    UI.contentInitialization();
  });
};

// function routerInitialization () {
//   const router = new Router([
//     new Route('news-list', 'news-list.html', true),
//     new Route('news', 'news.html'),
//     new Route('category', 'category.html'),
//     new Route('auth', 'auth.html'),
//   ]);
//   router.init();
// }
