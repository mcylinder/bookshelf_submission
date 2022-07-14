import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll } from "./BooksAPI"
import Book from "./component/Book";

function Search() {



	const [bookCollection, setBookCollection] = useState([]);//maintain unfiltered set
	const [books, setBooks] = useState([]);


	useEffect(() => {
		getAll().then(data => {
			setBookCollection(data);
			setBooks(data);
		})

	}, []);


	useEffect(() => {
		setBooks(bookCollection)
	}, []);

	const setShelf = (selectionObj) => {
		let chosenIndex = bookCollection.findIndex(el => el.id === selectionObj.id);
		bookCollection[chosenIndex].shelf = selectionObj.shelf;
		setBookCollection([...bookCollection]);
	}

	const processFilter = (userEntry) => {
		//checking for ALL match
		let fltrs = userEntry.split(' ').filter(el => el !== '');

		let filteredBookCollection = [];
		filteredBookCollection = bookCollection.filter(el => {
			let instanceCount = 0;
			for (let flt of fltrs) {
				if (el.search_fld.indexOf(flt.trim()) !== -1) {
					instanceCount++;
				}
			}

			return instanceCount === fltrs.length;
		});

		setBooks(filteredBookCollection);
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