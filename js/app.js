'use strict';

// News Class
class News {
  constructor(title, reporter, date, category, text) {
    this.title = title;
    this.reporter = reporter;
    this.date = date;
    this.category = category;
    this.text = text;
  }
}

// UI Class
class UI {
  static displayNewsList() {
    const StoredNewsList = [
      {
        title : 'Organic Beef Market - Global Industry Analysis by Size, Share, Growth, Trends and Forecast 2020 – 2026',
        reporter: 'WISEGUY RESEARCH CONSULTANTS PVT LTD',
        date: 'Wednesday, November 4th, 2020',
        category: 'business',
        text: 'The report is aimed at all-inclusive growth of the market scope. Also, it is aimed at the overall size of the market by the demand and supply base; there are prominent industries to procure the mentioned above products to boost their demands and are making most of the same for numerous applications to boost their potential. The report is concerned about the mentioned above aspects and provides the segmentation details to discuss the real strength of the international Organic Beef market.\n' +
          '\n' +
          'Leading industries are utilizing the products to grow their demands and make use of the numerous applications to boost their potential. The report is aimed at the above factors and providing market segmentation to assist in elaborating on actual strength of the international Organic Beef market.',
      },
      {
        title: 'South Australian women changing the world: Winnovation Awards 2020 Finalists announced',
        reporter: 'Newsmaker',
        date: 'Tuesday, October 27th, 2020',
        category: 'science',
        text: 'South Australian women with a vision to change the world have been recognised for their work and commitment to excellence in the 2020 Winnovation Awards Finalists list.\n' +
          '\n' +
          'The finalists were selected by independent judges from a record field of applicants who vied for 11 awards categories across science, technology, engineering, the arts and mathematics.\n' +
          '\n' +
          'Nicole Swaine, President of Women In Innovation SA, said the awards elevate and celebrate the role of female innovators across all industries, research institutes and government.\n' +
          '\n' +
          '“We had a record turnout this year, perhaps surprising in such a time of uncertainty,” Ms Swaine said.  “Feedback from our judges was that they were blown away by the quality and had a very difficult task in making their selections.\n' +
          '\n' +
          '“We commend all our entrants who contribute to making South Australia a more innovative state. By innovating, every single one of them creates a ripple effect, creating new opportunities for jobs, furthering research, and generally improving our quality of life.”',
      },
      {
        title: 'Australian String Quartet takes up mini residency at Lot Fourteen',
        reporter: 'Australian String Quartet',
        date: 'Sunday, October 18th, 2020',
        category: 'Culture',
        text: 'Quartet-in-Residence at the University of Adelaide, the Australian String Quartet (ASQ), throws open its doors to share new art music with its neighbours through a mini-residency at Adelaide’s ideas and innovation precinct, Lot Fourteen.\n' +
          '\n' +
          'Including two days of open rehearsals in which any member of the precinct can drop in and watch as the Quartet prepares new work for upcoming concerts and recordings, a panel discussion featuring Adelaide-based composer Anne Cawrse, and an exclusive iteration of the ensemble’s popular ASQ Close Quarters concert series, the residency provides an opportunity to explore the parallels between artistic and cultural activity and entrepreneurial enterprise.',
      },
    ];

    const newsList = StoredNewsList;

    newsList.forEach(news => UI.addNewsToList(news));
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
        <small class="text-muted">${news.reporter}</small>
    `;

    listOfNewsWrapper.append(listOfNewsItem);
  }
}

// Store Class

// Events:
//  - Display news
document.addEventListener('DOMContentLoaded', UI.displayNewsList);

//  - Create news
//  - Edit news
//  - Delete news
