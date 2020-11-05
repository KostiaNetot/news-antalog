
(() => {
  const router = new Router([
    new Route('news-list', 'news-list.html', true),
    new Route('news', 'news.html'),
    new Route('category', 'category.html'),
    new Route('auth', 'auth.html'),
  ]);
  router.init();
})();
