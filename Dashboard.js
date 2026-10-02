import { useState, useEffect } from "react";

function Dashboard() {

  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  // Load books and users from Local Storage
  useEffect(() => {

    const savedBooks = localStorage.getItem("books");
    const savedUsers = localStorage.getItem("users");

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

  }, []);

  // Calculate book information
  const totalBooks = books.reduce(
    (total, book) => total + Number(book.quantity),
    0
  );

  const availableBooks = books.filter(
    (book) => book.quantity > 0
  ).length;

  const borrowedBooks = books.filter(
    (book) => book.quantity === 0
  ).length;

  // Find low-stock books
  const lowStockBooks = books.filter(
    (book) => book.quantity < 2
  );

  return (
    <div>

      <h1 className="page-title">
        Dashboard
      </h1>

      <div className="cards">

        <div className="card">
          <h3> Total Books</h3>
          <p>{totalBooks}</p>
        </div>

        <div className="card">
          <h3> Available Books</h3>
          <p>{availableBooks}</p>
        </div>

        <div className="card">
          <h3> Borrowed Books</h3>
          <p>{borrowedBooks}</p>
        </div>

        <div className="card">
          <h3> Total Users</h3>
          <p>{users.length}</p>
        </div>

      </div>

      <div className="table-container">

        <h2> Low Stock Books</h2>

        <br />

        <table>

          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {lowStockBooks.length === 0 ? (

              <tr>
                <td colSpan="5">
                  No low-stock books.
                </td>
              </tr>

            ) : (

              lowStockBooks.map((book) => (

                <tr key={book.id}>

                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.quantity}</td>
                  <td>⚠️ Low Stock</td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;