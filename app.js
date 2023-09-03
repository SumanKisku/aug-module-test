const express = require("express");
const mongoose = require("mongoose");
const clc = require("cli-color");
const validator = require("validator");
const bcrypt = require("bcrypt");
require('dotenv').config();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);



const app = express();

// file imports
const handleSignup = require("./routes/user/handleSignup.js");
const handleLogin = require("./routes/user/handleLogin.js");
const handleLogout = require("./routes/user/handleLogout.js");
const isAuth = require("./middlewares/isAuth.js");
const addBook = require("./routes/book/addBook.js");
const deleteBook = require("./routes/book/deleteBook.js");
const bookList = require("./routes/book/bookList.js");

const PORT = process.env.PORT || 8000;
const MONGO_URI = "mongodb+srv://sumankisku:3W7UHNEPfMejGlTi@cluster0.7nxa6go.mongodb.net/library-management-app";

// mongoDb session store
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: 'sessions'
});

// db connection
mongoose.connect(MONGO_URI).then(() => {
  console.log(clc.green.bold.underline("MongoDB connected"));
}).catch((err) => {
  console.log(clc.red.bold(err));
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "this is my secret",
  resave: false,
  saveUninitialized: false,
  store: store,
}))


// setting the view engine
app.set("view engine", "ejs");

// making static files available, in public folder
app.use(express.static("public")); 


// routes
app.get("/", (req, res) => {
  return res.send("Ths is your Library Management App");
})

// get login
app.get("/login", (req, res) => {
  if(req.session.isAuth) {
    return res.redirect("dashboard");
  }
  return res.render("login");
})

// get registration
app.get("/registration", (req, res) => {
  return res.render("register");
})

// get dashboard
app.get("/dashboard", (req, res) => {
  return res.render("dashboard");
})

// post registration
app.post("/registration", handleSignup);

// post login
app.post("/login", handleLogin);

// post logout
app.post('/logout', isAuth, handleLogout);

// post addBook
app.post("/add-book", isAuth, addBook);

// post deleteBook
app.post("/delete-book", isAuth, deleteBook);

// get book-list
app.get("/book-list", isAuth, bookList);

app.listen(PORT, () => {
  console.log(clc.blue.bold("Server is running on"), clc.blue.bold.underline(`http://localhost:${PORT}`));
})

