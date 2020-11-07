class Storage {

  static storageInitialization() {
    if (!localStorage.getItem('allNews')) {
      localStorage.setItem('allNews', JSON.stringify(initialNewsData));
    }
    if (!localStorage.getItem('allCategories')) {
      localStorage.setItem('allCategories', JSON.stringify(initialCategoriesData));
    }
    if (localStorage.getItem('isAuth') === null) {
      localStorage.setItem('isAuth', JSON.stringify(false));
    }
  }

  static getData(key) {
    return  JSON.parse(localStorage.getItem(key));
  }

  static setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static findItemById(key, id) {
    return this.getData(key).filter(item => {
      return item.id === id;
    })[0];
  }

  // static isAuthorized() {
  //   return !!localStorage.getItem('isAuth');
  // }

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
