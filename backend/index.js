import express, { Router } from "express";
import mysql from "mysql";

const app = express();
const PORT = 8800;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});
// console.log(db)
//connecting to db
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
    console.log("Connected to DB");
    }
})
// if there is an auth problem
// ALTER USER 'root' @ 'localhost" IDENTIFIED WITH mysql_native_password BY 'Benzy4you@_-'

//to allow client send json request to express
app.use(express.json());

// Routers ---------------------------------------------------
//homepage
app.get("/", (req, res) => {
  res.json("Welcome to the backend server");
});

//get all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books;";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

//To add books to the DB

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json("Book has been created succefully");
  });

});

app.listen(PORT, () => {
  console.log("Connected to the Backend at port: " + PORT);
});
