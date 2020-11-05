
class UI {
  static displayNewsList() {
    const allNews = Store.getAllNews();
    allNews.forEach(news => UI.addNewsToList(news));
  }

  static addNewsToList(news) {
    const listOfNewsWrapper = document.querySelector('#news-list');
    const listOfNewsItem = document.createElement('a');

    listOfNewsItem.setAttribute('class', 'list-group-item list-group-item-action mb-2');

    listOfNewsItem.innerHTML = `
      <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">${news.title}</h5>
          <small class="text-muted">${news.date}</small>
        </div>
        <p class="mb-1 text-truncate">${news.text}</p>
        <div class="d-flex w-100 justify-content-between">
          <small class="text-muted">${news.reporter}</small>
          <a href="#" class="btn btn-danger btn-sm delete">delete</a>
        </div>
    `;

    listOfNewsWrapper.append(listOfNewsItem);
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.setAttribute('class', `alert alert-${className}`);
    div.append(message);
    const container = document.querySelector('.container');
    const newsForm = document.querySelector('#news-form');
    container.insertBefore(div, newsForm);

    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  static clearFields(form) {
    form.querySelector('#title').value = '';
    form.querySelector('#reporter').value = '';
    form.querySelector('#date').value = '';
    form.querySelector('#category').value = '';
    form.querySelector('#news-text').value = '';
  }

  static deleteNews(el) {
    if (el.classList.contains('delete')) {
      el.closest('.list-group-item').remove();
    }
  }
}
