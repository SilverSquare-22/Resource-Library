const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "librarySecret",
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");

let users = [];
let resources = [
    { title: "Clean Code", type: "Book", author: "Robert C. Martin" },
    { title: "You Don’t Know JS", type: "Book", author: "Kyle Simpson" },
    { title: "Understanding Node.js", type: "Article", author: "Node Weekly" }
];

// Home
app.get("/", (req, res) => {
    res.render("index", { resources, user: req.session.user });
});

// Register
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.redirect("/login");
});

// Login
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        res.redirect("/dashboard");
    } else {
        res.send("Invalid credentials");
    }
});

// Dashboard
app.get("/dashboard", (req, res) => {
    if (!req.session.user) return res.redirect("/login");
    res.render("dashboard", { user: req.session.user });
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));