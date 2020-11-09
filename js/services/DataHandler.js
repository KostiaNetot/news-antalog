class DataHandler {

  static test(e) {
    console.log(e.target);
  }

  static createNewNews(e) {
    e.preventDefault();
    const { allCategories } = Storage.getData();
    const newNewsForm = e.target;
    const newsTitle = newNewsForm['news-title'].value;
    const newsReporter = newNewsForm['news-reporter'].value;
    const newsDate = newNewsForm['news-date'].value;
    const newsText = newNewsForm['news-text'].value;
    const checkBoxes = newNewsForm.querySelectorAll('.form-check-input');
    let isCategChecked = false;

    const categories = Array.from(checkBoxes).filter(box => {
      if (box.checked) { isCategChecked = true }
      return box.checked;
    }).map(box => box.value);

    switch (true) {
      case e.submitter.classList.contains('create-news'):
          if (!newsTitle || !newsReporter || !newsDate || !newsText) {
            alert('All fields should be filled');
          } else {
            if (!isCategChecked) {
              alert('You should check for at least one category');
            } else {
              const { allNews } = Storage.getData();
              const newNews = new News(Date.now(), newsTitle, newsReporter, newsDate, newsText);
              newNews.setCategories(categories);
              allNews.push(newNews);
              Storage.setData('allNews', allNews);
              UI.removePopup();
            }
          }
        break;

      case e.submitter.classList.contains('cancel-news'):
        console.log('cancel-news');
        break;
    }
  }

  // static addCategoriesToNewNews(news) {
  //   console.log(news);
  // }

  static createNewCategory(e) {
    e.preventDefault();
    // const popup = document.querySelector('.popup');

    if (e.target.classList.contains('create-categ') && e.target.previousElementSibling.value) {
      const { value } = e.target.previousElementSibling;
      const newCategory = new Category(Date.now(), value);
      const { allCategories } = Storage.getData();

      const isExist = allCategories.find(categ => categ.name === value);
      if (isExist) {
        alert('category already exist');
        UI.removePopup();
      } else {
        allCategories.push(newCategory);
        Storage.setData('allCategories', allCategories);
        UI.removePopup();
      }
    }
    if (e.target.classList.contains('cancel-categ')) {
      UI.removePopup();
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
