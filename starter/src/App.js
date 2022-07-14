import "./App.css";
import { useEffect, useState } from "react";
import { getAll } from "./BooksAPI"

import Shelf from "./component/Shelf"
import React from "react";
import { Link } from "react-router-dom";

function App() {

  const [bookCollection, setBookCollection] = useState([])

  useEffect(() => {
    getAll().then(data => {
      setBookCollection(data);
    })

  }, []);

  const setShelf = (selectionObj) => {
    let chosenIndex = bookCollection.findIndex(el => el.id === selectionObj.id);
    bookCollection[chosenIndex].shelf = selectionObj.shelf;
    setBookCollection([...bookCollection]);
  }
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf title="Currently Reading" filter="currentlyReading" books={bookCollection} setShelf={setShelf} />
            <Shelf title="Want to Read" filter="wantToRead" books={bookCollection} setShelf={setShelf} />
            <Shelf title="Read" filter="read" books={bookCollection} setShelf={setShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link aria-label="Search books" className="search_link" to="search">Add a book</Link>

        </div>
      </div>

    </div>
  );
}

export default App;
