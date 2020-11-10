class Router {

  static switchRoutes(location, content) {
    switch (true) {
      case location === 'news-list':
      case location === '':
        const { allNews } = Storage.getData();
        allNews.forEach(news => UI.addNewsListOnThePage(news, content));
        break;

      case location === 'auth':
        const { isAuth } = Storage.getData();
        UI.addContentToAuthPage(isAuth, content);
        break;

      case /news-(\d+)/.test(location):
        UI.addNewsContentOnThePage(+location.substr(5), content);
        break;

      case /category-(.*)/.test(location):
        DataHandler.getNewsListByCategory(location.substr(9), content);
        break;
    }
  }

}
