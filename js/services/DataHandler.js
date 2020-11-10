class DataHandler {

  static createNewNews(e) {
    e.preventDefault();
    const { allCategories } = Storage.getData();
    const newNewsForm = e.target;
    const newsTitle = newNewsForm['news-title'].value;
    const newsReporter = newNewsForm['news-reporter'].value;
    const newsDate = newNewsForm['news-date'].value;
    const newsText = newNewsForm['news-text'].value;
    const checkBoxes = newNewsForm.querySelectorAll('.form-check-input');

    switch (true) {
      case e.submitter.classList.contains('create-news'):
        let isCategChecked;

        const categories = Array.from(checkBoxes).filter(box => {
          if (box.checked) { isCategChecked = true }
          return box.checked;
        }).map(box => box.value);

        if (!newsTitle || !newsReporter || !newsDate || !newsText) {
          alert('All fields should be filled');
        } else {
          if (!isCategChecked) {
            alert('You should check for at least one category');
          } else {
            const { allNews, allCategories } = Storage.getData();
            const newNews = new News(Date.now(), newsTitle, newsReporter, newsDate, newsText);
            newNews.setCategories(categories);
            DataHandler.setNewsIdForCheckedCategs(newNews.id, categories, allCategories);
            allNews.push(newNews);
            Storage.setData('allNews', allNews);
            UI.removePopup();
          }
        }
      break;

      case e.submitter.classList.contains('save-news'):
        console.log('save-news');
        break;

      case e.submitter.classList.contains('cancel-news'):
        UI.removePopup();
        break;
    }
  }

  static handleNewsPanel(e) {
    e.preventDefault();
    switch (true) {
      case e.target.classList.contains('delete-news'):
        DataHandler.removeNews(+e.target.dataset.id);
        break;

      case e.target.classList.contains('edit-news'):
        DataHandler.editNews(+e.target.dataset.id);
        break;
    }
  }

  static editNews(id) {
    const news = Storage.findItemById('allNews', id);
    const { allCategories } = Storage.getData();

    const formElOptions = {
      id: 'newNewsForm',
      tagName: 'form',
      event: 'submit',
      handler: DataHandler.createNewNews,
    };

    const checkIsMatch = (categName) => {
      let isMatch;
      news.categories.forEach((categ) => {
        categ === categName ? isMatch = true : ''
      });
      return isMatch;
    };

    const formElInner = `
      <input type="text" value="${news.title}" name="news-title" placeholder="title">
      <input type="text" value="${news.reporter}" name="news-reporter" placeholder="reporter">
      <input type="date" value="${news.date}" name="news-date" max="${new Date().toISOString().split("T")[0]}">
      <textarea name="news-text" value="${news.text}" cols="30" rows="7">${news.text}</textarea>
      ${ allCategories.map((categ, i) => {
      return `<div class="form-check">
          <input class="form-check-input" ${ checkIsMatch(categ.name) ? 'checked' : '' } value="${categ.name}" data-name="${categ.name}" data-id="${categ.id}" type="checkbox" id="categ-${i+1}">
          <label class="form-check-label" for="categ-${i+1}">
            ${categ.name}
          </label>
        </div>`
    }).join('') }
      <button class="save-news btn btn-success btn-sm">create</button>
      <button class="cancel-news btn btn-outline-secondary btn-sm">cancel</button>
    `;

    UI.displayCreationForm(formElOptions, formElInner);
  }

  static removeNews(id) {
    const { allNews, allCategories } = Storage.getData();
    const filteredNews = allNews.filter(news => news.id !== id);

    allCategories.filter(categ => {
      const index = categ.newsList.indexOf(id);
      if (index !== -1) {
        categ.newsList.splice(index, 1);
      }
      return categ;
    });
    if (confirm('Delete this news?')) {
      Storage.setData('allNews', filteredNews);
      Storage.setData('allCategories', allCategories);
      UI.contentInitialization();
    }
  }

  static getNewsListByCategory(location, content) {
    const { allNews } = Storage.getData();

    allNews.forEach(news => {
      const categIdx = news.categories.indexOf(location);
      if (categIdx !== -1) {
        UI.addNewsListOnThePage(news, content);
      }
    });
  }

  static setNewsIdForCheckedCategs(newsId, checkedCategs, allCategs) {
    checkedCategs.forEach((checked) => {
      allCategs.forEach((categ) => {
        if (categ.name === checked) {
          categ.newsList.push(newsId);
        }
      });
    });
    Storage.setData('allCategories', allCategs);
  }

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

  static handleCategorySelect(e) {
    window.location.hash = `#category-${e.target.value}`
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
