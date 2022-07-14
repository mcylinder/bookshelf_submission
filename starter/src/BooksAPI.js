import legacyData from './legacy'
const api = "https://reactnd-books-api.udacity.com";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then((res) => res.json())
    .then((data) => {
      let combineArrays = [...legacyData.legacyData, ...data.books];

      let searchPrep = combineArrays.map(item => {
        let title = item.title.toLowerCase();
        let authors = item.authors.join(' ').toLowerCase();
        let isbns = item.industryIdentifiers || [];
        let isbnCompiled = isbns.map(isbn => isbn.identifier).join(' ');

        item['search_fld'] = `${title} ${authors} ${isbnCompiled}`;
        return item;
      })
      return searchPrep;
    });

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());

export const search = (query, maxResults) =>
  fetch(`${api}/search`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books);
