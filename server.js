// =============================================================================

// Dependencies

// =============================================================================
var express    = require("express");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));

var exhpbs = require("express-handlebars");

app.engine("handlebars", exhpbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// =============================================================================

// Setup mysql connection

// =============================================================================
var mysql = require("mysql");

var connection = mysql.createConnection({
    host    : "localhost",
    user    : "root",
    password: "",
    database: "task_saver_db"
});

connection.connect(function(err) {
    if (err) {
        console.log("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id: " + connection.threadId);
});

// Root get routes
app.get("/", function(req, res) {
    connection.query("SELECT * FROM tasks;", function(err, data) {
        if (err) throw err;

        res.render("index", { tasks: data });
    });
});

// Post route back home =>
app.post("/", function(req, res) {
    connection.query("INSERT INTO tasks (task) VALUES (?)", [req.body.tasks], function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});
