import { useState, useEffect } from "react";

function Books() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState("");

  // Store all books
  const [books, setBooks] = useState([]);

  // Load books from Local Storage when the page opens
  useEffect(() => {
    const savedBooks = localStorage.getItem("books");

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  // Add a new book
  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id: Date.now(),
      title: title,
      author: author,
      genre: genre,
      isbn: isbn,
      quantity: Number(quantity)
    };

    const updatedBooks = [...books, newBook];

    setBooks(updatedBooks);

    // Save books to Local Storage
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    // Clear form
    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
    setQuantity("");

    alert("Book added successfully!");
  };

  // Delete a book
  const deleteBook = (id) => {

    const updatedBooks = books.filter(
      (book) => book.id !== id
    );

    setBooks(updatedBooks);

    localStorage.setItem(
      "books",
      JSON.stringify(updatedBooks)
    );
  };

  return (
    <div>

      <h1 className="page-title"> Book Management</h1>

      {/* Add Book Form */}

      <div className="form-container">

        <h2> Add New Book</h2>

        <br />

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Book Title</label>

            <input
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>

            <input
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Genre</label>

            <input
              type="text"
              placeholder="e.g. Fiction"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>ISBN</label>

            <input
              type="text"
              placeholder="Enter ISBN"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Initial Quantity</label>

            <input
              type="number"
              placeholder="Enter quantity"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <button type="submit">
             Add Book
          </button>

        </form>

      </div>

      <br />

      {/* Book List */}

      <div className="table-container">

        <h2> Book List</h2>

        <br />

        <table>

          <thead>

            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {books.length === 0 ? (

              <tr>
                <td colSpan="6">
                  No books added yet.
                </td>
              </tr>

            ) : (

              books.map((book) => (

                <tr key={book.id}>

                  <td>{book.title}</td>

                  <td>{book.author}</td>

                  <td>{book.genre}</td>

                  <td>{book.isbn}</td>

                  <td>{book.quantity}</td>

                  <td>
                    <button
                      onClick={() => deleteBook(book.id)}
                    >
                       Delete
                    </button>
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Books;