
class Category {

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.newsList = [];
  }

  addNews(newsId) {
    this.newsList.push(newsId)
  }

  removeNews(newsId) {
    this.newsList = this.newsList.filter(id => id !== newsId);
  }

  getName() {
    return this.name;
  }

}

const categ = new Category('sport');
