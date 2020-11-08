class DataHandler {

  static createNewNews(e) {
    e.preventDefault();
    const { allCategories } = Storage.getData();
    const newNewsForm = document.querySelector('#newNewsForm');
    const newsTitle = newNewsForm['news-title'].value;
    const newsReporter = newNewsForm['news-reporter'].value;
    const newsDate = newNewsForm['news-date'].value;
    const newsText = newNewsForm['news-text'].value;
    if (e.target.classList.contains('create-news')) {
      if (!newsTitle || !newsReporter || !newsDate || !newsText) {
        alert('All fields should be filled');
      } else {
        const newNews = new News(Date.now(), newsTitle, newsReporter, newsDate, newsText);
      }
    }
  }

  static addCategoriesToNewNews(news) {
    console.log(news);
  }

  static createNewCategory(e) {
    e.preventDefault();
    const popup = document.querySelector('.popup');

    if (e.target.classList.contains('create-categ') && e.target.previousElementSibling.value) {
      const { value } = e.target.previousElementSibling;
      const newCategory = new Category(Date.now(), value);
      const { allCategories } = Storage.getData();

      const isExist = allCategories.find(categ => categ.name === value);
      if (isExist) {
        alert('category already exist');
        UI.removePopup(popup);
      } else {
        allCategories.push(newCategory);
        Storage.setData('allCategories', allCategories);
        UI.removePopup(popup);
      }
    }
    if (e.target.classList.contains('cancel-categ')) {
      UI.removePopup(popup);
    }
  }

  static removeCategory(target) {
    if ( confirm('Remove category?') ) {
      const { dataset: { id, name } } = target;
      const { allCategories } = Storage.getData();
      const filteredCategories = allCategories.filter(categ => categ.id !== +id);
      const { allNews } = Storage.getData();

      const updatedAllNews = allNews.filter((news) => {
        const index = news.categories.indexOf(name);
        if (index !== -1) {
          news.categories.splice(index, 1);
        }
        return news;
      });

      Storage.setData('allCategories', filteredCategories);
      Storage.setData('allNews', updatedAllNews);
      UI.contentInitialization();
    }
  }

  static saveCategory (target) {
    const { previousElementSibling: {dataset: { name, id }, value} } = target;
    const { newsList } = Storage.findItemById('allCategories', +id);
    const editedCategory = new Category(+id, value);
    editedCategory.addNewsList(newsList);

    //replace categ name in news arr:
    const { allNews } = Storage.getData();
    const updatedAllNews = allNews.filter((news) => {
      const index = news.categories.indexOf(name);
      if (index !== -1) {
        news.categories.splice(index, 1, editedCategory.name);
      }
      return news;
    });

    //replace categ in categ arr:
    const { allCategories } = Storage.getData();
    const categIdx = allCategories.findIndex(categ => categ.id === +id);
    allCategories.splice(categIdx, 1, editedCategory);

    Storage.setData('allCategories', allCategories);
    Storage.setData('allNews', updatedAllNews);
    UI.contentInitialization();
  }

  // static updateNewsData(name, item = null) {
  //
  // }

  static handleAuthForm(e) {
    e.preventDefault();
    const authForm = document.forms['authForm'];
    const userEmail = authForm['email'].value;
    const userPassword = authForm['password'].value;

    if (!userEmail || !userPassword) {
      alert('All fields need to be filled!');
    } else {
      Storage.setAuthorized();
      authForm.reset();
      UI.contentInitialization();
    }
  }

}
