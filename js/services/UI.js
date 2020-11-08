class UI {

  static contentInitialization() {
    const container = document.querySelector('#main-container');
    const select = document.querySelector('#category-select');

    container.innerHTML = '';
    select.innerHTML = '';

    const location = window.location.hash.substr(1);

    const { allCategories } = Storage.getData();
    this.addCategoriesMenu(allCategories, select);

    const content = this.createElement({
      tagName: 'div',
      className: 'list-group mt-5',
    });

    Router.switchRoutes(location, content);

    container.append(content);
  }

  static addCategoriesMenu(allCategories, select) {
    const selectedOption = this.createElement({ tagName: 'option', innerText: 'Categories:' });
    select.append(selectedOption);

    allCategories.forEach(({ name }) => {
      const option = this.createElement({
        tagName: 'option',
        value: name,
        innerText: name.charAt(0).toUpperCase() + name.slice(1)
      });
      select.append(option);
    });
  }

  static addAuthFormToAuthPage(parent) {
    const authForm = this.createElement({
      tagName: 'form',
      name: 'authForm',
      event: 'submit',
      handler: DataHandler.handleAuthForm,
    });

    authForm.innerHTML = `
        <h5 class="text-center">Login:</h5>
        <div class="form-group">
          <label for="inputEmail">E-mail</label>
          <input type="email" name="email" class="form-control" id="inputEmail">
        </div>
        <div class="form-group">
          <label for="inputPassword">Password</label>
          <input type="password" name="password" class="form-control" id="inputPassword">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      `;
    parent.append(authForm);
  }

  static addCategoriesPanelToAuthPage(parent) {
    const wrapper = this.createElement({
      tagName: 'div',
      className: 'categ-wrapper pb-3 d-flex',
      event: 'click',
      handler: this.handleCategoriesPanel,
    });
    const { allCategories } = Storage.getData();
    allCategories.forEach(({ name, id }) => {
      const categ = this.createElement({
        tagName: 'p',
        className: 'categ-bage border border-primary p-1 m-1',
        dataId: id,
        dataName: name,
        title: 'edit'
      });
      categ.innerHTML = `${name} <span data-id="${id}" data-name="${name}" class="remove-categ badge badge-light">X</span>`;
      wrapper.append(categ);
    });
    const formElOptions = {
      tagName: 'form',
      event: 'click',
      handler: DataHandler.createNewCategory,
    };
    const formElInner = `
      <input type="text" name="categName">
      <button class="create-categ btn btn-success btn-sm">create</button>
      <button class="cancel-categ btn btn-outline-secondary btn-sm">cancel</button>
    `;
    const createCategBtn = this.createElement({
      tagName: 'button',
      className: 'add-categ btn btn-sm btn-success',
      innerText: 'add category',
      event: 'click',
      handler: () => {this.displayCreationForm(formElOptions, formElInner)},
    });
    wrapper.append(createCategBtn);
    parent.append(wrapper);
  }

  static addNewsListPanelToAuthPage(parent) {
    const { allNews, allCategories } = Storage.getData();
    const newsList = this.createElement({
      tagName: 'ul',
      className: 'list-group news-list-panel',
    });
    allNews.forEach((news) => {
      const newsListItem = this.createElement({tagName: 'li', className: 'list-group-item text-truncate'});
      newsListItem.innerHTML = `
        ${news.title} 
        <span class="badge badge-pill badge-warning edit-news">edit</span> 
        <span class="badge badge-pill badge-danger delete-news">remove</span>
      `;
      newsList.append(newsListItem);
    });
    const formElOptions = {
      id: 'newNewsForm',
      tagName: 'form',
      event: 'click',
      handler: DataHandler.createNewNews,
    };
    const formElInner = `
      <input type="text" name="news-title" placeholder="title">
      <input type="text" name="news-reporter" placeholder="reporter">
      <input type="date" value="${new Date().toISOString().split("T")[0]}" name="news-date">
      <textarea name="news-text" cols="30" rows="7" placeholder="news text"></textarea>   
      ${ allCategories.map((categ, i) => {
        return `<div class="form-check">
          <input class="form-check-input" data-name="${categ.name}" data-id="${categ.id}" type="checkbox" value="" id="categ-${i}">
          <label class="form-check-label" for="categ-${i}">
            ${categ.name}
          </label>
        </div>`
      }).join('') }
      <button class="create-news btn btn-success btn-sm">create</button>
      <button class="cancel-news btn btn-outline-secondary btn-sm">cancel</button>
    `;
    const createNewsBtn = this.createElement({
      tagName: 'span',
      className: 'badge badge-pill badge-success create-news',
      innerText: 'create news',
      event: 'click',
      handler: () => { this.displayCreationForm(formElOptions, formElInner) },
    });
    newsList.append(createNewsBtn);
    parent.append(newsList);
  }

  static addContentToAuthPage(isAuth, parent) {
    if (!isAuth) {
      this.addAuthFormToAuthPage(parent);
    } else {
      this.addCategoriesPanelToAuthPage(parent);
      this.addNewsListPanelToAuthPage(parent);
    }
  }

  static displayCreationForm(options, innerHtml) {
    const popup = document.querySelector('.popup');
    popup.classList.remove('d-none');
    popup.innerHTML = '';
    const creationForm = UI.createElement(options);
    creationForm.innerHTML = innerHtml;
    popup.append(creationForm);
  }

  static removePopup(popup) {
    popup.innerHTML = '';
    popup.classList.add('d-none');
    this.contentInitialization();
  }

  static handleCategoriesPanel(e) {
    e.preventDefault();
    const { tagName, dataset: {name, id} } = e.target;

    if (tagName === 'P') {
      e.target.innerHTML = `
        <input data-name="${name}" data-id="${id}" value="${name}" type="text"/>
        <span class="save-categ badge badge-light">save</span>
      `;
    }
    if (e.target.classList.contains('remove-categ')) {
      DataHandler.removeCategory(e.target);
    }
    if (e.target.classList.contains('save-categ')) {
      DataHandler.saveCategory(e.target);
    }
  }

  static addNewsListOnThePage({ title, date, text, reporter, id }, parent) {
    const listNewsItem = this.createElement({
      tagName: 'a',
      className: 'list-group-item list-group-item-action mb-2',
      href: '#news',
      event: 'click',
      handler: this.handleNewsLink,
      dataId: id
    });

    listNewsItem.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${title}</h5>
        <small class="text-muted">${date}</small>
      </div>
      <p class="mb-1 text-truncate">${text}</p>
      <div class="d-flex w-100 justify-content-between">
        <small class="text-muted">${reporter}</small>
        </div>
        `;
    parent.append(listNewsItem);
  }

  //Find checked News in Storage by id:
  static handleNewsLink(e) {
    e.preventDefault();
    Storage.findItemById('allNews', e.target.dataset.is)
  }

  static createElement(options) {
    const element = document.createElement(options.tagName);

    if ('className' in options) {
      element.setAttribute('class', options.className);
    }
    if ('title' in options) {
      element.setAttribute('title', options.title);
    }
    if ('name' in options) {
      element.setAttribute('name', options.name);
    }
    if ('id' in options) {
      element.setAttribute('id', options.id);
    }
    if ('type' in options) {
      element.setAttribute('type', options.type);
    }
    if ('placeholder' in options) {
      element.setAttribute('placeholder', options.placeholder);
    }
    if ('href' in options) {
      element.setAttribute('href', options.href);
    }
    if ('innerText' in options) {
      element.innerText = options.innerText;
    }
    if ('dataId' in options) {
      element.setAttribute('data-id', options.dataId);
    }
    if ('dataName' in options) {
      element.setAttribute('data-name', options.dataName);
    }
    if ('style' in options) {
      element.setAttribute('style', options.style);
    }
    if ('event' in options) {
      element.addEventListener(options.event, options.handler);
    }
    return element;
  }

}
