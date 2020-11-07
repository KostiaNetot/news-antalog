class DataHandler {

  static removeCategory(target) {
    if ( confirm('Remove category?') ) {
      const { dataset: { id, name } } = target;
      const allCategories = Storage.getData('allCategories').filter(categ => categ.id !== id);
      const  allNews = this.updateNewsData(name);

      Storage.setData('allCategories', allCategories);
      Storage.setData('allNews', allNews);
      UI.contentInitialization();
    }
  }

  static saveCategory (target) {
    const { previousElementSibling: {dataset: { name, id }, value} } = target;

    const { newsList } = Storage.findItemById('allCategories', id);
    const editedCategory = new Category(id, value);
    editedCategory.addNewsList(newsList);

    //replace categ name in news arr:
    const allNews = this.updateNewsData(name, editedCategory.name);

    //replace categ in categ arr:
    const allCategories = Storage.getData('allCategories');
    const categIdx = allCategories.findIndex(categ => categ.id === id);
    allCategories.splice(categIdx, 1, editedCategory);

    Storage.setData('allCategories', allCategories);
    Storage.setData('allNews', allNews);
    UI.contentInitialization();
  }

  static updateNewsData(name, item = null) {
    return Storage.getData('allNews').filter(({categories}) => {
      const index = categories.indexOf(name);
      if (index !== -1) {
        return  categories.splice(index, 1, item);
      }
    });
  }

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
