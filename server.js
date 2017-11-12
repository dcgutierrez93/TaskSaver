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

// Set up mysql connection
var mysql = require("mysql");

var connection = mysql.createConnection({
    host    : "localhost",
    user    : "root",
    password: "",
    database: "task_saver_db"
});
