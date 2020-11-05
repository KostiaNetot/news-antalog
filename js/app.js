
// Events:
//  - Display news
document.addEventListener('DOMContentLoaded', UI.displayNewsList);

//  - Create news
const newsForm = document.querySelector('#news-form');

newsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get values from news-form
  const id = Date.now();
  const title = newsForm.querySelector('#title').value;
  const reporter = newsForm.querySelector('#reporter').value;
  const date = newsForm.querySelector('#date').value;
  const category = newsForm.querySelector('#category').value;
  const newsText = newsForm.querySelector('#news-text').value;

  // Validation
  if(title === '' || reporter == '' || date === '' || category === '' || newsText === '') {
    UI.showAlert('All fields need to be filled', 'danger');
  } else {
    // Instatiate news
    const news = new News(id, title, reporter, date, category, newsText);

    // Add News to UI
    UI.addNewsToList(news);
    // Add news to Store
    Store.addNews(news);
    // Success message
    UI.showAlert('News Added', 'success');
    UI.clearFields(newsForm);
  }

});

//  - Edit news

//  - Delete news
document.querySelector('#news-list').addEventListener('click', (e) => {
  e.preventDefault();
  UI.deleteNews(e.target);
  UI.showAlert('News Deleted', 'success');
});
