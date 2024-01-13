import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="banner">
        <h1>Bookworm Hub</h1>
      </div>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            <div className="img-div">
              {book.cover && <img src={book.cover} alt="" />}
            </div>
            <div className="info-div">
              {" "}
              <h2>{book.title}</h2>
              <p className="desc">{book.desc}</p>
              <span>{book.price}</span>
              <div className="btns">
                <button
                  className="delete"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <button className="update">
                  <Link to={`/update/${book.id}`}>Update</Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="button-52">
        <Link to={"/add"}>Add a new Book</Link>
      </button>
    </div>
  );
};

export default Books;
