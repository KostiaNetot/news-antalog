class Storage {

  static getAllNews() {
    let allNews;
    if (!localStorage.getItem('allNews')) {
      localStorage.setItem('allNews', JSON.stringify(initialNewsData));
      allNews = JSON.parse(localStorage.getItem('allNews'));
    } else {
      allNews = JSON.parse(localStorage.getItem('allNews'));
    }
    return allNews;
  }

  static findNewsById(id) {
    return this.getAllNews().filter(news => {
      return news.id === id;
    })[0];
  }

  static isAuthorized() {
    return !!localStorage.getItem('isAuth');
  }

  static setAuthorized() {
    localStorage.setItem('isAuth', JSON.stringify(true));
  }

  // static addNews(news) {
  //   const allNews = Store.getAllNews();
  //   allNews.push(news);
  //   localStorage.setItem('allNews', JSON.stringify(allNews));
  // }
  //
  // static removeNews(id) {
  //   const allNews = Store.getAllNews();
  //   allNews.forEach((news, index) => {
  //     allNews.splice(index, 1);
  //   });
  //   localStorage.setItem('allNews', JSON.stringify(allNews));
  // }

}
