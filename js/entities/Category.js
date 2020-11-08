
class Category {

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.newsList = [];
  }

  addNewsList(arr) {
    this.newsList = this.newsList.concat(arr);
  }

  getName() {
    return this.name;
  }

}

