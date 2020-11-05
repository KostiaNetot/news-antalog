
class Store {
  static getAllNews() {
    let allNews;
    if (localStorage.getItem('allNews') === null) {
      localStorage.setItem('allNews', JSON.stringify(initialNewsData));
      allNews = JSON.parse(localStorage.getItem('allNews'));
    } else {
      allNews = JSON.parse(localStorage.getItem('allNews'));
    }
    return allNews;
  }

  static addNews(news) {
    const allNews = Store.getAllNews();
    allNews.push(news);
    localStorage.setItem('allNews', JSON.stringify(allNews));
  }

  static removeNews(id) {
    const allNews = Store.getAllNews();
    allNews.forEach((news, index) => {
      allNews.splice(index, 1);
    });
    localStorage.setItem('allNews', JSON.stringify(allNews));
  }
}
