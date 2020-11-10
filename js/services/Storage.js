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

  static getData() {
    return {
      allNews: JSON.parse(localStorage.getItem('allNews')),
      allCategories: JSON.parse(localStorage.getItem('allCategories')),
      isAuth: JSON.parse(localStorage.getItem('isAuth')),
    }
  }

  static setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static findItemById(key, id) {
    return JSON.parse(localStorage.getItem(key)).filter(item => {
        return item.id === id;
      })[0];
  }

  static setAuthorized() {
    localStorage.setItem('isAuth', JSON.stringify(true));
  }

}
