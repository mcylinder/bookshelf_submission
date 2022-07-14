import Book from "./Book"

function Shelf({ title, filter, books, setShelf }) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{books.filter(book => book.shelf === filter).map((book) =>
						<li key={book.id}><Book book={book} setShelf={setShelf} /></li>
					)}
				</ol>
			</div>
		</div>

	)
}

export default Shelf;