function Book({ book, setShelf }) {

	const makeSelection = (newShelf) => {
		setShelf(newShelf);
	}

	return (
		<div className="book">
			<div className="book-top">
				<div
					className="book-cover"
					style={{
						width: 128,
						height: 193,
						backgroundImage:
							`url("${book.imageLinks ? book.imageLinks.thumbnail : 'https://dummyimage.com/128x193/eee/000.jpg&text=Cover+Missing'}")`,
					}}
				></div>
				<div className="book-shelf-changer">
					<select defaultValue={book.shelf} onChange={(e) => { makeSelection({ 'shelf': e.target.value, 'id': book.id }) }}>
						<option value="null" disabled>
							Move to...
						</option>
						<option value="currentlyReading">
							Currently Reading
						</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
					</select>
				</div>
			</div>
			<div className="book-title">{book.title}</div>
			{book.authors && <div className="book-authors">{book.authors.join(', ')}</div>}


		</div>
	)
}

export default Book;