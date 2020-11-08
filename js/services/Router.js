class Router {

  static switchRoutes(location, content) {
    switch (location) {

      case 'news-list':
      case '':
        const { allNews } = Storage.getData();
        allNews.forEach(news => UI.addNewsListOnThePage(news, content));
        break;

      case 'news':
        console.log('news');

        break;

      case 'category':
        console.log('category');
        break;

      case 'auth':
        const { isAuth } = Storage.getData();
        UI.addContentToAuthPage(isAuth, content);
        break;
    }
  }

}
