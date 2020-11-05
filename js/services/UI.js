class UI {

  static contentInitialization() {
    const container = document.querySelector('#main-container');
    container.innerHTML = '';
    const location = window.location.hash.substr(1);
    let content;

    switch (location) {

      case 'news-list':
      case '':
        const allNews = Storage.getAllNews();
        content = this.createElement({
          tagName: 'div',
          className: 'list-group mt-5',
        });
        allNews.forEach(news => UI.addNewsListOnThePage(news, content));
        break;

      case 'news':
        console.log('news');
        break;

      case 'category':
        console.log('category');
        break;

      case 'auth':
        content = this.createElement({
          tagName: 'div',
          className: 'card p-3 m-auto',
          style: 'width: 18rem;'
        });
        this.addContentToAuthPage(Storage.isAuthorized(), content);
        break;
    }

    container.append(content);
  }

  static addContentToAuthPage(isAuth, parent) {
    console.log(Storage.isAuthorized());
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
      parent.innerHTML = 'Authrorized'
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
    console.log(Storage.findNewsById(this.dataset.id));
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
    if ('href' in options) {
      element.setAttribute('href', options.href);
    }
    if ('innerHtml' in options) {
      element.innerText = options.innerText;
    }
    if ('dataId' in options) {
      element.setAttribute('data-id', options.dataId);
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
