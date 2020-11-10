class Router {

  static switchRoutes(location, content) {
    switch (location) {
      case 'news-list':
      case '':
        const { allNews } = Storage.getData();
        allNews.forEach(news => UI.addNewsListOnThePage(news, content));
        break;

      case 'category':
        console.log('category');
        break;

      case 'auth':
        const { isAuth } = Storage.getData();
        UI.addContentToAuthPage(isAuth, content);
        break;

      case location.match(/news-(\d+)/).input:
        UI.addNewsContentOnThePage(+location.substr(5), content);
        break;
    }
  }

}
