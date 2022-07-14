import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, search } from "./BooksAPI"
import Book from "./component/Book";

function Search() {

	const [books, setBooks] = useState([]);

	const setShelf = (selectionObj) => {
		let chosenIndex = books.findIndex(el => el.id === selectionObj.id);
		books[chosenIndex].shelf = selectionObj.shelf;
		setBooks([...books]);
	}

	const processFilter = (userEntry) => {
		let clean_entry = userEntry.trim();
		if (clean_entry === '') {
			setBooks([]);
			return;
		}

		search(clean_entry).then(data => {
			if (!data.error) {
				setBooks(data);
			} else {
				setBooks([]);
			}
		})
	}

	return (
		<div className="app">

			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input
							onChange={(e) => processFilter(e.target.value)}
							type="text"
							placeholder="Search by title, author, or ISBN"
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{books.map((book) =>
							<li key={book.id}><Book book={book} setShelf={setShelf} /></li>
						)}
					</ol>
				</div>
			</div>
		</div>
	)
}

export default Search;