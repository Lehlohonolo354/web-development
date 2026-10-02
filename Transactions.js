import { useState, useEffect } from "react";

function Transactions() {

  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [transactions, setTransactions] = useState([]);

  // Load books and transactions from Local Storage
  useEffect(() => {

    const savedBooks = localStorage.getItem("books");
    const savedTransactions = localStorage.getItem("transactions");

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

  }, []);

  // Save books to Local Storage
  const saveBooks = (updatedBooks) => {
    setBooks(updatedBooks);
    localStorage.setItem(
      "books",
      JSON.stringify(updatedBooks)
    );
  };

  // Add transaction to history
  const saveTransaction = (type, book, amount) => {

    const newTransaction = {
      id: Date.now(),
      book: book.title,
      quantity: amount,
      type: type,
      date: new Date().toLocaleString()
    };

    const updatedTransactions = [
      ...transactions,
      newTransaction
    ];

    setTransactions(updatedTransactions);

    localStorage.setItem(
      "transactions",
      JSON.stringify(updatedTransactions)
    );
  };

  // Add stock
  const addStock = (e) => {

    e.preventDefault();

    const amount = Number(quantity);

    if (!bookId || amount <= 0) {
      alert("Please select a book and enter a valid quantity.");
      return;
    }

    const selectedBook = books.find(
      (book) => book.id === Number(bookId)
    );

    if (!selectedBook) {
      alert("Book not found.");
      return;
    }

    const updatedBooks = books.map((book) => {

      if (book.id === Number(bookId)) {

        return {
          ...book,
          quantity: Number(book.quantity) + amount
        };

      }

      return book;
    });

    saveBooks(updatedBooks);

    saveTransaction(
      "Stock Added",
      selectedBook,
      amount
    );

    setBookId("");
    setQuantity("");

    alert("Stock added successfully!");
  };

  // Deduct stock / borrow book
  const deductStock = (e) => {

    e.preventDefault();

    const amount = Number(quantity);

    if (!bookId || amount <= 0) {
      alert("Please select a book and enter a valid quantity.");
      return;
    }

    const selectedBook = books.find(
      (book) => book.id === Number(bookId)
    );

    if (!selectedBook) {
      alert("Book not found.");
      return;
    }

    if (amount > Number(selectedBook.quantity)) {
      alert("Not enough books available.");
      return;
    }

    const updatedBooks = books.map((book) => {

      if (book.id === Number(bookId)) {

        return {
          ...book,
          quantity: Number(book.quantity) - amount
        };

      }

      return book;
    });

    saveBooks(updatedBooks);

    saveTransaction(
      "Stock Deducted / Borrowed",
      selectedBook,
      amount
    );

    setBookId("");
    setQuantity("");

    alert("Book quantity deducted successfully!");
  };

  return (
    <div>

      <h1 className="page-title">
        Transactions
      </h1>

      {/* Transaction Form */}

      <div className="form-container">

        <h2> Manage Stock</h2>

        <br />

        <form>

          <div className="form-group">

            <label>Book</label>

            <select
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            >

              <option value="">
                -- Select a Book --
              </option>

              {books.map((book) => (

                <option
                  key={book.id}
                  value={book.id}
                >
                  {book.title} - Available: {book.quantity}
                </option>

              ))}

            </select>

          </div>

          <div className="form-group">

            <label>Quantity</label>

            <input
              type="number"
              min="1"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
            />

          </div>

          <button
            type="button"
            onClick={addStock}
          >
             Add Stock
          </button>

          {" "}

          <button
            type="button"
            onClick={deductStock}
          >
             Deduct / Borrow
          </button>

        </form>

      </div>

      <br />

      {/* Current Books */}

      <div className="table-container">

        <h2> Current Book Stock</h2>

        <br />

        <table>

          <thead>

            <tr>
              <th>Book</th>
              <th>Author</th>
              <th>Quantity</th>
            </tr>

          </thead>

          <tbody>

            {books.length === 0 ? (

              <tr>
                <td colSpan="3">
                  No books available.
                </td>
              </tr>

            ) : (

              books.map((book) => (

                <tr key={book.id}>

                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.quantity}</td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <br />

      {/* Transaction History */}

      <div className="table-container">

        <h2> Transaction History</h2>

        <br />

        <table>

          <thead>

            <tr>
              <th>Book</th>
              <th>Quantity</th>
              <th>Transaction</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {transactions.length === 0 ? (

              <tr>
                <td colSpan="4">
                  No transactions yet.
                </td>
              </tr>

            ) : (

              transactions.map((transaction) => (

                <tr key={transaction.id}>

                  <td>{transaction.book}</td>

                  <td>{transaction.quantity}</td>

                  <td>{transaction.type}</td>

                  <td>{transaction.date}</td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Transactions;