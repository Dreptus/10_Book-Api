/* global Handlebars, utils, dataSource */

{
  'use strict';
  
  const select = {
    all: {
      bookLinks: '.book__image',
    },
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      books: '.books-list',
    },
    book: {
      id: 'data-id',
    },
    attributes: {
      source: 'src',
      dataId: 'data-id',
    },
    clickedLink: 'data-id=',
    filters: '.filters',
  };
  const templates = {
    book: Handlebars.compile(
      document.querySelector(select.templateOf.book).innerHTML
    ),
  };
  const classNames = {
    favorite: 'favorite',
    hidden: 'hidden',
    filter: 'filter',
  };
  const helpers = {
    calcRating: function(rating) {
      if (rating <= 6) return `linear-gradient(to bottom,  #fefcea 0%, #f1da36 ${rating*10}%)`;
      if (rating > 6 && rating <= 8) return `linear-gradient(to bottom, #b4df5b 0%,#b4df5b ${rating*10}%)`;
      if (rating > 8 && rating <= 9) return `linear-gradient(to bottom, #299a0b 0%, #299a0b ${rating*10}%)`;
      if (rating > 9) return `linear-gradient(to bottom, #ff0084 0%,#ff0084 ${rating*100}%)`;
    },
  };

  class BooksList {
    constructor(dataSource) {
      this.books = dataSource.books;
      this.favoriteBooks = [];
      this.filters = [];
      this.getElements();
      this.renderBooks();
      this.initActions();
    }
    getElements() {
      this.bookContainer = document.querySelector(select.containerOf.books);
      this.filterCOntainer = document.querySelector(select.filters);
    }
    renderBooks() {
      this.books.forEach(book => {
        book.width = book.rating * 10;
        book.background = helpers.calcRating(book.rating);
        const generatedHTML = templates.book(book);
        const domElement = utils.createDOMFromHTML(generatedHTML);
        this.bookContainer.appendChild(domElement);
      });
    }
    filterBookList() {
      this.books.forEach(book => {
        let hidden = false;
        for (let filter of this.filters) {
          if (!book.details[filter]) {
            hidden = true;
            break;
          } else if (book.details[filter]) {
            hidden = false;
          }
        }
        if (hidden) {
          document.querySelector(`a[data-id="${book.id}"]`).classList.add(classNames.hidden);
        } else {
          document.querySelector(`a[data-id="${book.id}"]`).classList.remove(classNames.hidden);
        }
      });
    }
    initActions() {
      this.bookContainer.addEventListener('dblclick', (event) => {
        event.preventDefault();
        const clickedLink = event.target.offsetParent;
        const id = event.target.offsetParent.getAttribute(select.attributes.dataId);
        if (this.favoriteBooks.includes(id)) {
          clickedLink.classList.remove(classNames.favorite);
          this.favoriteBooks = this.favoriteBooks.filter(bookId => bookId != id);
        } else {
          clickedLink.classList.add(classNames.favorite);
          this.favoriteBooks.push(id);
        }
      });
      this.filterCOntainer.addEventListener('click', (event) => {
        if (event.target.name === classNames.filter && event.target.checked) {
          this.filters.push(event.target.value);
        } else {
          this.filters = this.filters.filter(f => f != event.target.value);
        }
        this.filterBookList(this.filters);
      });    
    }
  }

  const app = new BooksList(dataSource);
  console.log('This app', app);

}
