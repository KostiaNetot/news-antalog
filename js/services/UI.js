class UI {

  static contentInitialization() {
    const container = document.querySelector('#main-container');
    const select = document.querySelector('#category-select');

    container.innerHTML = '';
    select.innerHTML = '';

    const location = window.location.hash.substr(1);

    const allCategories = Storage.getData('allCategories', initialCategoriesData);
    this.addCategoriesMenu(allCategories, select);

    const content = this.createElement({
      tagName: 'div',
      className: 'list-group mt-5',
    });

    switch (location) {

      case 'news-list':
      case '':
        const allNews = Storage.getData('allNews');
        allNews.forEach(news => UI.addNewsListOnThePage(news, content));
        break;

      case 'news':
        console.log('news');

        break;

      case 'category':
        console.log('category');
        break;

      case 'auth':
        this.addContentToAuthPage(Storage.getData('isAuth'), content);
        break;
    }

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

  static addContentToAuthPage(isAuth, parent) {
    if (!isAuth) {
      const authForm = this.createElement({
        tagName: 'form',
        name: 'authForm',
        event: 'submit',
        handler: FormsHandler.handleAuthForm,
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
    } else {
      // ShOW ADMIN PANEL
      const wrapper = this.createElement({
        tagName: 'div',
        className: 'categ-wrapper pb-3 d-flex',
        event: 'click',
        handler: this.handleCategoriesPanel,
      });
      const allCategories = Storage.getData('allCategories');
      allCategories.forEach(({ name, id }) => {
        const categ = this.createElement({
          tagName: 'p',
          // className: 'btn btn-outline-primary btn-sm m-1',
          className: 'border border-primary p-1 m-1',
          dataId: id,
          dataName: name,
        });
        categ.innerHTML = `${name} <span data-id="${id}" data-name="${name}" class="remove-categ badge badge-light">X</span>`;
        wrapper.append(categ);
      });
      parent.append(wrapper);
    }
  }

  static handleCategoriesPanel(e) {
    e.preventDefault();
    const { tagName, dataset: {name} } = e.target;

    if (tagName === 'P') {
      e.target.innerHTML = `
        <input onblur="console.log('asdasd')" value="${name}" type="text"/>
        <span class="badge badge-light">save</span>
      `;
    }
    if (e.target.classList.contains('remove-categ')) {
      if ( confirm('Remove category?') ) {
        const { dataset: { id, name } } = e.target;
        const allCategories = Storage.getData('allCategories').filter(categ => categ.id !== id);
        const  allNews = Storage.getData('allNews').filter(({ categories }) => {
          const index = categories.indexOf(name);
          if (index !== -1) {
            return  categories.splice(index, 1);
          }
        });
        console.log(allNews);
        Storage.setData('allCategories', allCategories);
        Storage.setData('allNews', allNews);
        UI.contentInitialization();
      }
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
    console.log(Storage.findItemById('allNews', this.dataset.id));
  }

  static createElement(options) {
    const element = document.createElement(options.tagName);

    if ('className' in options) {
      element.setAttribute('class', options.className);
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
