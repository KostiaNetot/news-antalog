
class News {
  constructor(id, title, reporter, date, text) {
    this.title = title;
    this.reporter = reporter;
    this.date = date;
    this.categories = [];
    this.text = text;
    this.id = id;
  }

  setCategories = (...args) => {
    this.categories = this.categories.concat([...args]);
  };

}

